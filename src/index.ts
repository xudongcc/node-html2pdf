import * as puppeteer from "puppeteer";

export async function html2pdf(data: string, format: puppeteer.PDFFormat = "A4", timeout: number = 0) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    if (/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(data)) {
        await page.goto(data, { waitUntil: "networkidle2" });
    } else {
        await page.setContent(data);
    }

    await new Promise((resolve) => setTimeout(resolve, timeout));

    const pdf = await page.pdf({ format });

    await browser.close();

    return pdf;
}
