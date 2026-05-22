"""Convert certificate PDFs in scripts/cert-pdfs/ into JPGs in public/certificates/.

Place PDFs in scripts/cert-pdfs/ with these exact names (the .pdf part is fine
either way). Each becomes the matching .jpg the site references:

    ai-fluency.pdf            -> public/certificates/ai-fluency.jpg
    claude-cowork.pdf         -> public/certificates/claude-cowork.jpg
    claude-code-in-action.pdf -> public/certificates/claude-code-in-action.jpg
    claude-101.pdf            -> public/certificates/claude-101.jpg
"""
from pathlib import Path
import sys
import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "cert-pdfs"
DST = ROOT / "public" / "certificates"
DPI = 200

def convert(pdf_path: Path) -> Path:
    out = DST / (pdf_path.stem + ".jpg")
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    pix = page.get_pixmap(dpi=DPI)
    pix.save(out, jpg_quality=92)
    doc.close()
    return out

def main() -> int:
    SRC.mkdir(parents=True, exist_ok=True)
    DST.mkdir(parents=True, exist_ok=True)
    pdfs = sorted(SRC.glob("*.pdf"))
    if not pdfs:
        print(f"No PDFs found in {SRC}")
        print("Drop your certificate PDFs there and re-run.")
        return 1
    for pdf in pdfs:
        out = convert(pdf)
        print(f"  {pdf.name} -> {out.relative_to(ROOT)}")
    print(f"Done. {len(pdfs)} file(s) converted.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
