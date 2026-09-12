#!/usr/bin/env node
// Builds viz.html: a self-contained, interactive graph viewer for this OKF bundle.
// Walks every concept file (a *.md with `type` frontmatter, excluding index.md), embeds
// it as data into the shared okf-viz-template shell (vendored from
// https://github.com/GoogleCloudPlatform/knowledge-catalog, okf/src/reference_agent/viewer/),
// and writes the result to viz.html.
//
// Usage: node tools/generate-viz.js [bundleRoot] [templateDir] [outPath] [bundleName]
// Defaults: bundleRoot=".", templateDir="tools/okf-viz-template", outPath="viz.html",
//           bundleName="Appium Knowledge Bundle"

const fs = require('fs');
const path = require('path');

const BUNDLE_ROOT = process.argv[2] || '.';
const TEMPLATE_DIR = process.argv[3] || path.join(__dirname, 'okf-viz-template');
const OUT_PATH = process.argv[4] || 'viz.html';
const BUNDLE_NAME = process.argv[5] || 'Appium Knowledge Bundle';

const TYPE_PALETTE = {
  Topic: '#1e5d52',
  Reference: '#9a6a2f',
};
const DEFAULT_COLOR = '#94a3b8';

function walkMdFiles(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walkMdFiles(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n') && !raw.startsWith('---\r\n')) return null;
  const end = raw.indexOf('\n---', 4);
  if (end === -1) return null;
  const fmBlock = raw.slice(raw.indexOf('\n') + 1, end);
  const bodyStart = raw.indexOf('\n', end + 1);
  const body = bodyStart === -1 ? '' : raw.slice(bodyStart + 1);

  const fm = {};
  for (const line of fmBlock.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, '');
    }
    fm[key] = value;
  }
  return { fm, body };
}

// Matches OKF-recommended bundle-relative links ("/a/b.md") as well as plain relative
// links ("b.md", "../a/b.md"); external links (containing "://") are ignored.
const LINK_RE = /\]\(([^)\s]+\.md)(?:#[A-Za-z0-9_-]*)?\)/g;

function extractLinks(body, docDir, bundleRoot) {
  const out = [];
  const seen = new Set();
  let m;
  while ((m = LINK_RE.exec(body))) {
    const target = m[1];
    if (target.includes('://')) continue;
    const abs = target.startsWith('/')
      ? path.join(bundleRoot, target.slice(1))
      : path.join(docDir, target);
    let rel = path.relative(bundleRoot, abs).split(path.sep).join('/');
    if (rel.endsWith('.md')) rel = rel.slice(0, -3);
    if (rel && !seen.has(rel)) {
      seen.add(rel);
      out.push(rel);
    }
  }
  return out;
}

function buildConcepts(bundleRoot) {
  const concepts = [];
  for (const filePath of walkMdFiles(bundleRoot, [])) {
    if (path.basename(filePath) === 'index.md') continue;
    const parsed = parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
    if (!parsed || !parsed.fm.type) continue;
    const { fm, body } = parsed;

    const id = path
      .relative(bundleRoot, filePath)
      .replace(/\.md$/, '')
      .split(path.sep)
      .join('/');

    concepts.push({
      id,
      type: fm.type,
      title: fm.title || id,
      description: fm.description || '',
      resource: fm.resource || '',
      tags: Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [],
      body,
      status: fm.status || 'stable',
      generated: {},
      verified: [],
      stale_after: fm.stale_after || '',
      sources: [],
      trust_tier: 'unverified',
      stale: false,
      links_to: extractLinks(body, path.dirname(filePath), bundleRoot),
    });
  }
  return concepts;
}

function toNode(c) {
  return {
    data: {
      id: c.id,
      label: c.title || c.id,
      type: c.type,
      description: c.description,
      resource: c.resource,
      tags: c.tags,
      status: c.status,
      generated: c.generated,
      verified: c.verified,
      stale_after: c.stale_after,
      sources: c.sources,
      trust_tier: c.trust_tier,
      stale: c.stale,
      color: TYPE_PALETTE[c.type] || DEFAULT_COLOR,
      size: 30 + Math.min(60, Math.floor(c.body.length / 200)),
    },
  };
}

function buildGraph(concepts) {
  const ids = new Set(concepts.map((c) => c.id));
  const nodes = concepts.map(toNode);
  const edges = [];
  const seenEdges = new Set();
  for (const c of concepts) {
    for (const target of c.links_to) {
      if (target === c.id || !ids.has(target)) continue;
      const key = `${c.id}__${target}`;
      if (seenEdges.has(key)) continue;
      seenEdges.add(key);
      edges.push({ data: { id: key, source: c.id, target } });
    }
  }
  const bodies = {};
  for (const c of concepts) bodies[c.id] = c.body;
  const types = [...new Set(concepts.map((c) => c.type))].sort();
  return { nodes, edges, bodies, types, palette: TYPE_PALETTE };
}

// Keeps the graph's default node order matching how the bundle is meant to be read,
// so the viewer opens on "What is Appium?" rather than an alphabetically-first topic.
const READING_ORDER = [
  'introduction/what-is-appium',
  'introduction/supported-languages',
  'introduction/architecture',
  'introduction/app-types',
  'introduction/advantages',
  'introduction/tool-comparison',
  'introduction/setup-options',
  'introduction/limitations',
  'introduction/references',
  'driver-ecosystem/overview',
  'driver-ecosystem/how-drivers-work',
  'driver-ecosystem/drivers',
  'driver-ecosystem/uiautomator2-vs-espresso',
  'appium-setup/prerequisites',
  'appium-setup/windows/install-nodejs',
];

const concepts = buildConcepts(path.resolve(BUNDLE_ROOT));
concepts.sort((a, b) => {
  const ai = READING_ORDER.indexOf(a.id);
  const bi = READING_ORDER.indexOf(b.id);
  if (ai === -1 && bi === -1) return a.id.localeCompare(b.id);
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
});
const graph = buildGraph(concepts);

let template = fs.readFileSync(path.join(TEMPLATE_DIR, 'viz-template.html'), 'utf8');
const css = fs.readFileSync(path.join(TEMPLATE_DIR, 'viz.css'), 'utf8');
const js = fs.readFileSync(path.join(TEMPLATE_DIR, 'viz.js'), 'utf8');

template = template
  .replace('/*__VIZ_CSS__*/', css)
  .replace('/*__VIZ_JS__*/', js)
  .replace('__BUNDLE_NAME__', JSON.stringify(BUNDLE_NAME))
  .replace('__BUNDLE_DATA__', JSON.stringify(graph));

fs.writeFileSync(OUT_PATH, template, 'utf8');
console.log(
  JSON.stringify(
    { concepts: concepts.length, edges: graph.edges.length, bytes: Buffer.byteLength(template, 'utf8') },
    null,
    2
  )
);
