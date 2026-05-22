from pathlib import Path
import fitz

src = Path(__file__).resolve().parent.parent / "public" / "certificates"
for pdf in sorted(src.glob("*.pdf")):
    out = pdf.with_suffix(".jpg")
    doc = fitz.open(pdf)
    pix = doc.load_page(0).get_pixmap(dpi=180)
    pix.save(out, jpg_quality=90)
    doc.close()
    print(f"  {pdf.name} -> {out.name}")
print("done")
