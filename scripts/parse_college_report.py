#!/usr/bin/env python3
"""Parse college_report_extract.txt into structured research JSON."""
from pathlib import Path
import re
import json

text = Path("college_report_extract.txt").read_text(encoding="utf-8", errors="replace")
clean = re.sub(r"\f", "\n", text)
clean = re.sub(r"COLLEGE RESEARCH REPORT 2026[^\n]*\n", "", clean)
clean = re.sub(r"Compiled Sept 2026[^\n]*\n", "", clean)
clean = re.sub(r"\s*Page \d+\s*", "\n", clean)

pdf_markers = [
    (r"1\.\s+Kanachur Institute of Medical Sciences \(KIMS\)\s*$", "kanachur-institute-of-medical-sciences"),
    (r"2\.\s+Kempegowda Institute of Medical Sciences \(KIMS\)\s*$", "kempegowda-institute-of-medical-sciences"),
    (r"3\.\s+BGS Global Institute of Medical Sciences \(BGSGIMS\)\s*$", "bgs-global-institute-of-medical-sciences"),
    (r"4\.\s+Sapthagiri Institute of Medical Sciences", "sapthagiri-institute-of-medical-sciences"),
    (r"5\.\s+Vydehi Institute of Medical Sciences", "vydehi-institute-of-medical-sciences-research-centre"),
    (r"6\.\s+Smt\.\s*Kashibai Navale Medical College", "smt-kashibai-navale-medical-college-and-general-hospital"),
    (r"7\.\s+Dr\.\s*N\.\s*Y\.\s*Tasgaonkar", "dr-n-y-tasgaonkar-institute-of-medical-sciences"),
    (r"8\.\s+Vedantaa? Institute of Medical Sciences\s*$", "vedanta-institute-of-medical-sciences"),
    (r"9\.\s+Dr\.\s*D\.\s*Y\.\s*Patil Medical College", "d-y-patil-medical-college-hospital-and-research-centre"),
    (r"10\.\s+Heritage Institute of Medical Sciences", "heritage-institute-of-medical-sciences"),
    (r"11\.\s+Santosh Medical College\s*$", "santosh-medical-college"),
    (r"12\.\s+Venkateshwara Institute of Medical Sciences", "venkateshwara-institute-of-medical-sciences"),
    (r"13\.\s+ICARE Institute of Medical Sciences", "icare-institute-of-medical-sciences-and-research"),
    (r"14\.\s+KPC Medical College", "k-p-c-medical-college-and-hospital"),
    (r"15\.\s+Shri Ramkrishna Institute of Medical Sciences", "sanaka-medical-college"),
    (r"16\.\s+Shri Shankaracharya Institute of Medical Sciences", "shri-shankaracharya-institute-of-medical-sciences"),
    (r"17\.\s+Raipur Institute of Medical Sciences", "raipur-institute-of-medical-sciences-rims"),
    (r"1\.\s+Indian Institute of Management Bangalore", "indian-institute-of-management-iim-bangalore"),
    (r"2\.\s+T\.\s*A\.\s*Pai Management Institute", "t-a-pai-management-institute-manipal"),
    (r"3\.\s+Symbiosis Institute of Business Management", "symbiosis-institute-of-buisness-management-bangalore"),
    (r"4\.\s+Jamnalal Bajaj Institute of Management Studies", "jamnalal-bajaj-institute-of-management-studies-mumbai"),
    (r"5\.\s+S\.\s*P\.\s*Jain Institute of Management", "s-p-jain-institute-of-management-and-research"),
    (r"6\.\s+Indian Institute of Management Lucknow", "indian-institute-of-management-iim-lucknow"),
    (r"7\.\s+Institute of Management Technology \(IMT\)", "institute-of-management-technology-imt-ghaziabad"),
    (r"8\.\s+Indian Institute of Management Raipur", "indian-institute-of-management-iim-raipur"),
    (r"9\.\s+Amity University Chhattisgarh", "amity-university-raipur"),
    (r"10\.\s+Indian Institute of Management Calcutta", "indian-institute-of-management-iim-calcutta"),
    (r"11\.\s+Indian Institute of Foreign Trade", "indian-institute-of-foreign-trade-iift-kolkata"),
    (r"12\.\s+International Management Institute \(IMI\)", "international-management-institute-imi-kolkata"),
    (r"1\.\s+Indian Institute of Science \(IISc\)", "indian-institute-of-science-bangalore"),
    (r"2\.\s+National Institute of Technology Karnataka", "national-institute-of-technology-karnataka-surathkal"),
    (r"3\.\s+R\.\s*V\.\s*College of Engineering", "rv-college-of-engineering"),
    (r"4\.\s+Institute of Chemical Technology \(ICT\)", "institute-of-chemical-technology-mumbai"),
    (r"5\.\s+Veermata Jijabai Technological Institute", "veermata-jijabai-technological-institute-mumbai"),
    (r"6\.\s+Visvesvaraya National Institute of Technology", "visvesvaraya-national-institute-of-technology-nagpur"),
    (r"7\.\s+Indian Institute of Technology \(BHU\)", "indian-institute-of-technology-bhu-varanasi"),
    (r"8\.\s+Amity University,\s*Noida", "amity-university-noida"),
    (r"9\.\s+National Institute of Technology \(NIT\) Raipur", "national-institute-of-technology-nit-raipur"),
    (r"10\.\s+Bhilai Institute of Technology \(BIT\)", "bhilai-institute-of-technology-bit-durg"),
    (r"11\.\s+National Institute of Technology \(NIT\) Durgapur", "national-institute-of-technology-nit-durgapur"),
    (r"12\.\s+Heritage Institute of Technology \(HIT\)", "heritage-institute-of-technology"),
]

idx = clean.find("1. Kanachur Institute of Medical Sciences (KIMS)\n\nMedical")
if idx < 0:
    idx = clean.find("1. Kanachur Institute of Medical Sciences (KIMS)\nMedical")
body = clean[idx:] if idx >= 0 else clean

positions = []
for pat, slug in pdf_markers:
    for m in re.finditer(pat, body, flags=re.M):
        line = body[m.start() : body.find("\n", m.start())]
        if "..." in line or " . . ." in line:
            continue
        positions.append((m.start(), slug, m.group(0)))

positions.sort(key=lambda x: x[0])
seen = set()
uniq = []
for p in positions:
    if p[1] in seen:
        continue
    seen.add(p[1])
    uniq.append(p)
positions = uniq
print("found colleges", len(positions))

GALLERY_POOL = [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
]
ALTS = [
    "Campus exterior",
    "Academic block",
    "Library",
    "Lecture hall",
    "Hostel & residential",
    "Sports & recreation",
]


def bullets(section_text):
    items = []
    for line in section_text.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith(("·", "•", "-", "*", "\ufffd")) or line.startswith("\u00b7"):
            item = re.sub(r"^[·•\-\*\u00b7\ufffd]\s*", "", line).strip()
            if item:
                items.append(re.sub(r"\s+", " ", item))
        elif items and line[:1].isspace() is False and not re.match(
            r"^(Placements|Campus|Sources|Admission|Cutoffs|Courses|College|Note:)", line, re.I
        ):
            # continuation lines (often indented or wrapped)
            if len(line) > 15 and not re.match(r"^\d+\.\s", line):
                items[-1] = items[-1] + " " + re.sub(r"\s+", " ", line)
    return items


def section_between(block, start_labels, end_labels):
    start = None
    for lab in start_labels:
        m = re.search(lab, block, re.I | re.M)
        if m:
            start = m.end()
            break
    if start is None:
        return ""
    end = len(block)
    for lab in end_labels:
        m = re.search(lab, block[start:], re.I | re.M)
        if m:
            end = start + m.start()
            break
    return block[start:end]


def field(block, label):
    pat = rf"(?im)^{re.escape(label)}\s{{2,}}(.+)$"
    m = re.search(pat, block)
    if m:
        return re.sub(r"\s+", " ", m.group(1)).strip()
    pat2 = rf"(?i){re.escape(label)}\s{{2,}}([^\n]+)"
    m = re.search(pat2, block)
    if m:
        return re.sub(r"\s+", " ", m.group(1)).strip()
    return ""


def parse_block(block, slug, index):
    website = ""
    wm = re.search(r"Official site:\s*(\S+)", block)
    if wm:
        website = wm.group(1).strip().rstrip(".")

    ov = ""
    m = re.search(
        r"(?:Medical|MBA|Engineering|Management|Business)\s*\|[^\n]*\n+(.+?)\n\s*College Overview",
        block,
        re.S | re.I,
    )
    if m:
        ov = re.sub(r"\s+", " ", m.group(1)).strip()
    else:
        paras = [re.sub(r"\s+", " ", p).strip() for p in re.split(r"\n\s*\n", block) if len(p) > 80]
        if paras:
            ov = paras[0][:700]

    overview_sec = section_between(block, [r"College Overview"], [r"Courses,", r"Campus photos"])
    established = field(overview_sec, "Established") or field(block, "Established")
    typ = field(overview_sec, "Type") or field(block, "Type")
    affiliation = field(overview_sec, "Affiliation") or field(block, "Affiliation")
    approval = field(overview_sec, "Approval") or field(overview_sec, "Approvals") or field(block, "Approval")
    ranking = field(overview_sec, "Ranking") or field(block, "Ranking")
    contact = field(overview_sec, "Contact") or field(block, "Contact")
    teaching = (
        field(overview_sec, "Teaching hospital")
        or field(overview_sec, "Hospital")
        or field(block, "Teaching hospital")
    )
    campus = field(overview_sec, "Campus") or field(block, "Campus")
    naac = field(overview_sec, "NAAC") or field(block, "NAAC")
    address = field(overview_sec, "Address") or field(block, "Address")

    highlights = []
    for lab, val in [
        ("Established", established),
        ("Type", typ),
        ("Affiliation", affiliation),
        ("Approval", approval),
        ("NAAC", naac),
        ("Ranking", ranking),
        ("Campus", campus),
        ("Teaching hospital", teaching),
        ("Address", address),
        ("Contact", contact),
    ]:
        if val and len(val) < 200:
            highlights.append({"label": lab, "value": val})

    courses = []
    courses_sec = section_between(block, [r"Courses, Eligibility", r"Courses &"], [r"Cutoffs", r"Admission Process"])
    course_notes = []
    for nm in re.finditer(r"(?im)^Note:\s*(.+)$", block):
        course_notes.append(re.sub(r"\s+", " ", nm.group(1)).strip())

    course_names = [
        "MBBS",
        "MD/MS",
        "MD",
        "MS",
        "MBA",
        "PGDM",
        "PGP",
        "MMS",
        "B.Tech",
        "B.E.",
        "B.Tech / BE",
        "M.Tech",
        "DM / M.Ch",
        "M.Ch / DM",
        "Diploma / Paramedical",
        "B.Sc",
        "PG Diploma",
        "Executive MBA",
        "Ph.D",
        "BE / B.Tech",
    ]
    for line in courses_sec.splitlines():
        raw = line.strip()
        if not raw:
            continue
        for cn in course_names:
            if raw.startswith(cn + " ") or raw == cn or raw.startswith(cn + "\t"):
                cols = re.split(r"\s{2,}", raw)
                if len(cols) >= 2:
                    courses.append(
                        {
                            "name": cols[0],
                            "duration": cols[1] if len(cols) > 1 else "",
                            "seats": cols[2] if len(cols) > 2 else "",
                            "eligibility": cols[3] if len(cols) > 3 else "",
                            "fees": cols[4] if len(cols) > 4 else "",
                        }
                    )
                break

    ded = {}
    for c in courses:
        if c["name"] not in ded or len(c["fees"]) > len(ded[c["name"]]["fees"]):
            ded[c["name"]] = c
    courses = list(ded.values())

    cutoffs = []
    cut_sec = section_between(block, [r"^Cutoffs"], [r"Admission Process", r"Placements"])
    raw_lines = []
    for line in cut_sec.splitlines():
        line = line.rstrip()
        if not line.strip():
            continue
        if re.search(r"Exam\s*/\s*Category|Cutoff \(closing|Course\s+Duration", line, re.I):
            continue
        raw_lines.append(line)

    for line in raw_lines:
        cols = re.split(r"\s{2,}", line.strip())
        if len(cols) >= 2 and re.search(r"\d", cols[-1]):
            cutoffs.append({"label": cols[0].strip(), "value": " ".join(c.strip() for c in cols[1:])})
            continue
        collapsed = re.sub(r"\s+", " ", line).strip()
        m = re.match(
            r"^(.+?)\s+(Closing ranks.+|\d[\d,]*(?:\s*[-–]\s*\d[\d,]*)?.*|R\d.+|~?.+\d.+)$",
            collapsed,
            re.I,
        )
        if m and len(m.group(1)) > 3:
            cutoffs.append({"label": m.group(1).strip(), "value": m.group(2).strip()})
        elif re.search(r"\d{3,}|percentile|closing|LPA|%", collapsed, re.I):
            cutoffs.append({"label": "Cutoff detail", "value": collapsed})

    seen_c = set()
    uniq_c = []
    for c in cutoffs:
        key = (c["label"], c["value"])
        if key in seen_c or not c["value"]:
            continue
        seen_c.add(key)
        uniq_c.append(c)
    cutoffs = uniq_c[:14]

    adm = bullets(section_between(block, [r"Admission Process"], [r"Placements", r"Campus Life"]))
    plc = bullets(section_between(block, [r"Placements\s*/?\s*Internship", r"Placements"], [r"Campus Life", r"Sources:"]))
    camp = bullets(section_between(block, [r"Campus Life(?:\s*&\s*Hostel)?"], [r"Sources:"]))

    gallery = []
    for i in range(6):
        gallery.append({"src": GALLERY_POOL[(index + i) % len(GALLERY_POOL)], "alt": f"{ALTS[i]} — placeholder"})

    return {
        "overview": ov,
        "established": established,
        "type": typ,
        "affiliation": affiliation,
        "approval": approval,
        "ranking": ranking,
        "website": website,
        "contact": contact,
        "teachingHospital": teaching,
        "campusSize": campus,
        "highlights": highlights,
        "courses": courses,
        "courseNotes": course_notes[:6],
        "cutoffs": cutoffs,
        "admissionSteps": adm,
        "placements": plc,
        "campusLife": camp,
        "gallery": gallery,
    }


results = {}
for i, (start, slug, _) in enumerate(positions):
    end = positions[i + 1][0] if i + 1 < len(positions) else len(body)
    results[slug] = parse_block(body[start:end], slug, i)

print("parsed", len(results))
print("missing overview", sum(1 for v in results.values() if not v["overview"]))
print("missing admission", sum(1 for v in results.values() if not v["admissionSteps"]))
print("missing courses", sum(1 for v in results.values() if not v["courses"]))
print("missing campus", sum(1 for v in results.values() if not v["campusLife"]))

Path("_college_research_raw.json").write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
print("wrote _college_research_raw.json")
