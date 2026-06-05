#!/usr/bin/env python3
"""
Download brand graphics from Asana for all MP FRESH pages.

Usage:
  1. Get a Personal Access Token from https://app.asana.com/0/my-apps
  2. Run: ASANA_TOKEN=your_token python3 scripts/download_images.py

Each page task in Asana has 8 brand graphics attached:
  01-hero-banner.jpg
  02-key-concept-illustration.jpg
  03-infographic-process-steps.jpg
  04-infographic-stats-data.jpg
  05-supporting-icon-set.jpg
  06-quote-callout-graphic.jpg
  07-section-divider-illustration.jpg
  08-summary-takeaways-visual.jpg
"""

import os, json, urllib.request, ssl

TOKEN = os.environ.get("ASANA_TOKEN", "")
if not TOKEN:
    print("ERROR: Set ASANA_TOKEN environment variable")
    print("Get one at: https://app.asana.com/0/my-apps")
    exit(1)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, "public", "images", "pages")

# Task GID → image output directory mapping
TASKS = {
    "1214756376995308": "services/hub",
    "1214756415552732": "services/landing-page-optimization",
    "1214756232249258": "services/paid-media",
    "1214756377062423": "services/meta-ads-management",
    "1214756264003824": "services/analytics-and-attribution",
    "1214756179017591": "services/call-tracking",
    "1214756232774721": "services/google-ads-management",
    "1214756263710642": "services/web-development/hub",
    "1214756376937336": "services/web-development/website-design",
    "1214755985630088": "services/web-development/cro-development",
    "1214756263849350": "services/web-development/technical-seo",
    "1214756232646551": "services/web-development/landing-page-dev",
    "1214756263764498": "services/web-development/integrations",
    "1214756179650834": "ai-edge/hub",
    "1214755910513007": "ai-edge/social-media",
    "1214756141093634": "ai-edge/ai-governance",
    "1214756376856273": "ai-edge/data-sovereignty",
    "1214756178379822": "ai-edge/owned-ai-systems",
    "1214756178839316": "ai-edge/ai-in-paid-media",
    "1214756262349172": "get-started/hub",
    "1214756140926723": "get-started/qualification",
    "1214769667816444": "get-started/request-an-audit",
    "1214756178810479": "get-started/book-a-call",
    "1214756376291300": "get-started/thanks",
    "1214756179625555": "who-we-help/hub",
    "1214756230996301": "who-we-help/behavioral-health",
    "1214756179643593": "who-we-help/mental-health",
    "1214756415443913": "company/about",
    "1214756232722442": "company/contact",
}

ctx = ssl.create_default_context()

def api_get(path):
    url = f"https://app.asana.com/api/1.0{path}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/json"
    })
    with urllib.request.urlopen(req, context=ctx) as resp:
        return json.loads(resp.read())

def download_file(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, context=ctx) as resp:
        with open(path, 'wb') as f:
            f.write(resp.read())

total = 0
errors = 0

for task_gid, img_subdir in TASKS.items():
    out_dir = os.path.join(IMG_DIR, img_subdir)
    os.makedirs(out_dir, exist_ok=True)

    try:
        data = api_get(f"/tasks/{task_gid}/attachments?opt_fields=name,download_url&limit=20")
        attachments = [a for a in data.get("data", []) if a.get("name", "").endswith(".jpg")]

        for att in attachments:
            out_path = os.path.join(out_dir, att["name"])
            if os.path.exists(out_path):
                print(f"  SKIP {img_subdir}/{att['name']} (exists)")
                continue
            try:
                download_file(att["download_url"], out_path)
                total += 1
                print(f"  ✓ {img_subdir}/{att['name']}")
            except Exception as e:
                errors += 1
                print(f"  ✗ {img_subdir}/{att['name']}: {e}")
    except Exception as e:
        errors += 1
        print(f"✗ Task {task_gid} ({img_subdir}): {e}")

print(f"\nDone: {total} images downloaded, {errors} errors")
