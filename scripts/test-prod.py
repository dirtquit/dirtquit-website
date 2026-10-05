import urllib.request
import re
import json

base = "http://localhost:4000"
url = f"{base}/bangalore/kitchen-cleaning/"
html = urllib.request.urlopen(url).read().decode("utf-8")

# Check OG & Twitter
og_match = re.search(r'<meta property="og:image" content="(.*?)"', html)
twitter_match = re.search(r'<meta name="twitter:image" content="(.*?)"', html)
og_url = og_match.group(1) if og_match else None
twitter_url = twitter_match.group(1) if twitter_match else None
print("OG Image:", og_url)
print("Twitter Image:", twitter_url)

# Check JSON-LD
ld_match = re.search(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL)
schema_img_url = None
if ld_match:
    ld_data = json.loads(ld_match.group(1))
    for s in ld_data.get("@graph", []):
        if s.get("@type") == "Service":
            schema_img_url = s.get("image")
            print("Service schema image:", schema_img_url)

# Request og:image URL and schema image URL on local production server
for label, u in [("OG Image", og_url), ("Schema Image", schema_img_url)]:
    if u:
        local_u = u.replace("https://www.dirtquit.info", base)
        try:
            res = urllib.request.urlopen(local_u)
            print(f"Fetch {label} ({local_u}) -> Status {res.status}, Content-Type: {res.headers.get('Content-Type')}")
        except Exception as e:
            print(f"Fetch {label} ({local_u}) FAILED: {e}")
