import type { LandingContent } from './content';

export const landingData: Record<'en' | 'th', LandingContent> = {
    en: {
        metadata: {
            title: 'EZY-Doc — Free Quotation, Invoice & Receipt Generator | No Sign-Up',
            description:
                'Create professional quotations, invoices, acceptance certificates, and receipts instantly. Free PDF export, Thai & English supported, no account needed. Built for freelancers.',
            keywords: [
                'free invoice generator',
                'quotation maker online',
                'receipt generator',
                'freelance invoice thailand',
                'acceptance certificate template',
            ],
        },
        hero: {
            title: 'Professional Business Documents in Minutes — Free, No Sign-Up',
            subtitle:
                'Stop wrestling with Word templates. Create Quotations, Invoices, Acceptance Certificates, and Receipts that look professional — export to PDF instantly. Built for freelancers and independent contractors who need documents without the overhead.',
            primaryCta: 'Create Your Document Now →',
            secondaryCta: 'See how it works ↓',
            trustSignals: [
                '✓ 100% Free — No credit card',
                '✓ No account required',
                '✓ Works in Thai & English',
                '✓ Your data never leaves your browser',
            ],
        },
        socialProof: '"Finally a tool that takes 2 minutes, not 20."',
        documentCards: [
            {
                title: 'Quotation',
                subtitle: 'ใบเสนอราคา',
                description:
                    'Draft price proposals that win clients. Add line items, apply tax, and send a PDF that looks like it came from an agency.',
                cta: 'Create Quotation',
            },
            {
                title: 'Invoice',
                subtitle: 'ใบแจ้งหนี้',
                description:
                    'Request payment professionally. Reference your quotation, set due dates, and include your bank details automatically.',
                cta: 'Create Invoice',
            },
            {
                title: 'Acceptance Certificate',
                subtitle: 'ใบตรวจรับงาน',
                description:
                    'Document that your work was delivered and accepted. Essential for project-based freelancers to trigger payment.',
                cta: 'Create Acceptance Certificate',
            },
            {
                title: 'Receipt',
                subtitle: 'ใบเสร็จรับเงิน',
                description:
                    'Confirm payment received. Issue a clean, professional receipt the moment money hits your account.',
                cta: 'Create Receipt',
            },
        ],
        features: [
            {
                eyebrow: 'Zero Friction',
                title: 'No account. No setup. No monthly fees.',
                description:
                    "Open the tool, fill in your details, download your PDF. That's the entire workflow. Your information stays in your browser — we never see it.",
            },
            {
                eyebrow: 'Thai & English PDF',
                title: 'One tool, two languages.',
                description:
                    'Set your document language independently from the interface language. Work in Thai, send an English invoice to an international client — or the other way around.',
            },
            {
                eyebrow: 'Tax-Ready',
                title: 'VAT and tax built in.',
                description:
                    'Toggle tax on or off per document. Enter your rate (7% or custom) and totals calculate instantly. Everything you need to bill correctly.',
            },
            {
                eyebrow: 'Your Branding',
                title: 'Upload your logo, own the look.',
                description:
                    'Add your business logo to every document. It embeds directly in the PDF — no watermarks, no EZY-Doc branding on the document itself.',
            },
            {
                eyebrow: 'Instant PDF',
                title: 'One click, professional output.',
                description:
                    'Preview your document exactly as it will print before you export. What you see is what your client receives.',
            },
            {
                eyebrow: 'Smart Numbering',
                title: 'Auto-formatted document numbers.',
                description:
                    'Documents are numbered automatically in the format QO2605-0001 (type + year + month + sequence). You control the sequence — the system handles the rest.',
            },
        ],
        steps: [
            {
                title: 'Configure your document',
                description:
                    'Choose your document type, set the language for your PDF, toggle document number and tax on or off. Takes 30 seconds.',
            },
            {
                title: 'Fill in the details',
                description:
                    "Enter your business info (saved for the session), your client's details, and line items. Totals calculate as you type.",
            },
            {
                title: 'Preview and export',
                description:
                    'Switch to the Preview tab to see your finished document. Click Export PDF to download. Done.',
            },
        ],
        comparison: {
            title: 'Why Not Just Use Word or Google Docs?',
            headers: ['', 'EZY-Doc', 'Word / Google Docs', 'Full CRM/ERP'],
            rows: [
                ['Setup time', '0 seconds', '10–30 min per doc', 'Days'],
                ['Consistent format', '✓ Always', '✗ Varies', '✓'],
                ['PDF export', '✓ One click', 'Requires extra steps', '✓'],
                ['Monthly cost', '฿0', 'Free / ฿0', '฿500–3,000+'],
                ['For freelancers', '✓ Built for this', '✗ Generic', '✗ Overkill'],
                ['No sign-up', '✓', '✓', '✗ Required'],
            ],
        },
        useCases: [
            {
                title: 'Built for How Freelancers Actually Work',
                description:
                    "Designers & Creatives\nSend a quotation before the project, an invoice when work is delivered, and a receipt when you're paid. The full document chain in one tool.",
            },
            {
                title: 'Developers & IT Consultants',
                description:
                    'Issue an Acceptance Certificate when a sprint or project is signed off — the document your client needs to release payment.',
            },
            {
                title: 'Photographers & Videographers',
                description:
                    'Create a quotation for a shoot, an invoice for the final files, and a receipt once payment clears. Each in under two minutes.',
            },
            {
                title: 'Translators & Writers',
                description:
                    'Per-word or per-project billing made clean. Add a custom unit (words, pages, hours) and calculate totals automatically.',
            },
            {
                title: 'Business Consultants',
                description:
                    'Monthly retainer invoices, project quotations, and acceptance sign-offs — all in one consistent format.',
            },
        ],
        faq: [
            {
                question: 'Is EZY-Doc really free?',
                answer: 'Yes, completely free. EZY-Doc is supported by non-intrusive advertising. There are no hidden fees, no freemium limits on the core tool, and no credit card required — ever.',
            },
            {
                question: 'Do I need to create an account?',
                answer: 'No account, no email, no sign-up of any kind. Open the tool and start creating immediately.',
            },
            {
                question: 'Where is my data stored?',
                answer: 'Your data is never sent to our servers. Everything — your business info, client details, line items, and logo — exists only in your browser for the duration of your session. When you close or refresh the tab, it resets. We recommend exporting your PDF before leaving the page.',
            },
            {
                question: 'Can I create documents in Thai?',
                answer: 'Yes. Both the interface and the PDF output support Thai and English. You can work in Thai and export a Thai-language PDF, an English-language PDF, or switch languages independently.',
            },
            {
                question: 'Does EZY-Doc support VAT?',
                answer: 'Yes. Enable the tax option in the Config tab, enter your rate (default 7% for Thai VAT), and it will appear in your PDF automatically. Tax can be toggled on or off per session.',
            },
            {
                question: 'Can I use my own logo?',
                answer: 'Yes. Upload any PNG, JPG, or WebP image and it will be automatically compressed and embedded in your PDF. No size limits that will break the tool.',
            },
            {
                question: 'What document types are supported?',
                answer: 'Four types: Quotation (QO), Invoice (IV), Acceptance Certificate (AC), and Receipt (RC). Each has a document number generated automatically.',
            },
            {
                question: 'Can I send the document directly to my client from EZY-Doc?',
                answer: 'Not in the current version. Export the PDF and send it via email, LINE, or any platform you prefer. Direct sharing is on the roadmap for a future version.',
            },
            {
                question: 'What if I make a mistake after exporting?',
                answer: "Go back to the editor, correct the information, and export again. Since the session is still active (you haven't refreshed), your data is still there. Always double-check before exporting.",
            },
            {
                question: "Is EZY-Doc's output legally valid in Thailand?",
                answer: 'EZY-Doc produces formatted documents that follow standard Thai business document conventions. However, for official tax invoices (ใบกำกับภาษี) that require registration with the Revenue Department, you should consult a tax professional. For general business use between parties, EZY-Doc documents are widely used and accepted.',
            },
        ],
        footerCta: {
            title: 'Ready to send a document in the next 3 minutes?',
            subtitle:
                'No sign-up. No templates to download. No formatting headaches. Just open, fill, export.',
            cta: '→ Create Your First Document',
        },
    },
    th: {
        metadata: {
            title: 'EZY-Doc — สร้างใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จรับเงิน ฟรี ไม่ต้องสมัคร',
            description:
                'เครื่องมือสร้างเอกสารธุรกิจสำหรับ Freelance และผู้ประกอบการอิสระ สร้างใบเสนอราคา ใบแจ้งหนี้ ใบตรวจรับงาน ใบเสร็จรับเงิน ดาวน์โหลด PDF ฟรี ไม่ต้องสมัครสมาชิก ไม่มีค่ารายเดือน',
            keywords: [
                'สร้างใบเสนอราคาออนไลน์ฟรี',
                'ทำใบแจ้งหนี้ฟรี',
                'ใบเสร็จรับเงิน template',
                'ใบตรวจรับงาน freelance',
                'invoice ภาษาไทย',
            ],
        },
        hero: {
            title: 'สร้างเอกสารแบบมืออาชีพในไม่กี่นาที — ฟรี ไม่ต้องสมัคร',
            subtitle:
                'หยุดเสียเวลากับ Template Word ที่ไม่มีรูปแบบแน่นอน สร้างใบเสนอราคา ใบแจ้งหนี้ ใบตรวจรับงาน และใบเสร็จรับเงินที่ดูเป็นมืออาชีพ ดาวน์โหลด PDF ได้ทันที สำหรับ Freelance และผู้ประกอบการอิสระที่ต้องการเอกสารคุณภาพโดยไม่เสียค่าใช้จ่าย',
            primaryCta: 'เริ่มสร้างเอกสารได้เลย →',
            secondaryCta: 'ดูวิธีการใช้งาน ↓',
            trustSignals: [
                '✓ ฟรี 100% — ไม่ต้องใช้บัตรเครดิต',
                '✓ ไม่ต้องสมัครสมาชิก',
                '✓ รองรับภาษาไทยและอังกฤษ',
                '✓ ข้อมูลของคุณไม่ถูกส่งออกจากเบราว์เซอร์',
            ],
        },
        socialProof:
            '"ในที่สุดก็มีเครื่องมือที่ใช้ได้จริงสำหรับ Freelance ไม่ต้องง้อ Excel อีกต่อไป"',
        documentCards: [
            {
                title: 'ใบเสนอราคา',
                subtitle: 'Quotation',
                description:
                    'สร้างใบเสนอราคาที่ดูเป็นมืออาชีพ เพิ่มรายการสินค้า/บริการ คำนวณภาษี และส่ง PDF ให้ลูกค้าได้ทันที',
                cta: 'สร้างใบเสนอราคา',
            },
            {
                title: 'ใบแจ้งหนี้',
                subtitle: 'Invoice',
                description:
                    'เรียกเก็บเงินได้อย่างมืออาชีพ อ้างอิงจากใบเสนอราคา กำหนดวันครบกำหนดชำระ และระบุบัญชีธนาคารของคุณ',
                cta: 'สร้างใบแจ้งหนี้',
            },
            {
                title: 'ใบตรวจรับงาน',
                subtitle: 'Acceptance Certificate',
                description:
                    'บันทึกการส่งมอบงานและการรับงานอย่างเป็นทางการ จำเป็นสำหรับงาน Project ที่ต้องมีเอกสารก่อนรับเงิน',
                cta: 'สร้างใบตรวจรับงาน',
            },
            {
                title: 'ใบเสร็จรับเงิน',
                subtitle: 'Receipt',
                description: 'ยืนยันการรับชำระเงินอย่างเป็นทางการ ออกใบเสร็จได้ทันทีที่ได้รับเงิน',
                cta: 'สร้างใบเสร็จรับเงิน',
            },
        ],
        features: [
            {
                eyebrow: 'ไม่ต้องสมัคร ไม่มีค่าใช้จ่าย',
                title: 'ใช้ได้เลยทันที ไม่ต้องตั้งค่าอะไรทั้งนั้น',
                description:
                    'เปิดเครื่องมือ กรอกข้อมูล ดาวน์โหลด PDF นั่นคือทั้งหมดของ Workflow ข้อมูลของคุณอยู่ในเบราว์เซอร์เท่านั้น เราไม่เห็นข้อมูลของคุณเลย',
            },
            {
                eyebrow: 'รองรับ 2 ภาษา',
                title: 'สร้างเอกสารภาษาไทยหรืออังกฤษก็ได้',
                description:
                    'ตั้งค่าภาษาของเอกสาร PDF แยกจากภาษาของหน้าเว็บ ทำงานเป็นภาษาไทย แต่ส่งใบแจ้งหนี้ภาษาอังกฤษให้ลูกค้าต่างประเทศได้เลย',
            },
            {
                eyebrow: 'คำนวณภาษีได้',
                title: 'รองรับ VAT และภาษีอื่นๆ',
                description:
                    'เปิด/ปิดการคำนวณภาษีได้ในแต่ละเอกสาร ตั้งอัตราภาษีเองได้ (default 7% สำหรับ VAT ไทย) ระบบคำนวณให้อัตโนมัติ',
            },
            {
                eyebrow: 'ใส่โลโก้ของคุณได้',
                title: 'เอกสารของคุณ แบรนด์ของคุณ',
                description:
                    'อัปโหลดโลโก้บริษัทหรือร้านค้าของคุณ ระบบจะฝังลงใน PDF โดยอัตโนมัติ ไม่มีลายน้ำ ไม่มีโลโก้ EZY-Doc บนเอกสาร',
            },
            {
                eyebrow: 'Preview ก่อน Export',
                title: 'เห็นผลจริงก่อนดาวน์โหลด',
                description:
                    'Switch ไปที่แท็บ Preview เพื่อดูหน้าตาเอกสารจริงๆ ก่อน Export ลูกค้าเห็นอะไร คุณเห็นแบบนั้นก่อน',
            },
            {
                eyebrow: 'เลขที่เอกสารอัตโนมัติ',
                title: 'ระบบเลขที่เอกสารมาตรฐาน',
                description:
                    'เลขที่เอกสารถูกสร้างอัตโนมัติในรูปแบบ QO260500001 (ประเภทเอกสาร + ปี + เดือน + ลำดับ) คุณกำหนดลำดับได้ ส่วนที่เหลือระบบจัดการให้',
            },
        ],
        steps: [
            {
                title: 'ตั้งค่าเอกสาร',
                description:
                    'เลือกประเภทเอกสาร ตั้งภาษาของ PDF เปิด/ปิดเลขที่เอกสารและภาษี ใช้เวลาไม่ถึง 1 นาที',
            },
            {
                title: 'กรอกข้อมูล',
                description:
                    'ใส่ข้อมูลบริษัทของคุณ ข้อมูลลูกค้า และรายการสินค้า/บริการ ระบบคำนวณยอดรวมให้อัตโนมัติ',
            },
            {
                title: 'Preview และ Export',
                description:
                    'ดูตัวอย่างเอกสารที่แท็บ Preview กด Export PDF เพื่อดาวน์โหลด เสร็จแล้ว',
            },
        ],
        comparison: {
            title: 'ทำไมไม่ใช้ Word หรือ Google Docs?',
            headers: ['', 'EZY-Doc', 'Word / Google Docs', 'CRM / ERP'],
            rows: [
                ['เวลาตั้งค่า', '0 วินาที', '10–30 นาทีต่อเอกสาร', 'หลายวัน'],
                ['รูปแบบสม่ำเสมอ', '✓ ทุกครั้ง', '✗ แล้วแต่ครั้ง', '✓'],
                ['Export PDF', '✓ คลิกเดียว', 'ต้องทำเพิ่ม', '✓'],
                ['ค่าใช้จ่ายต่อเดือน', '฿0', 'ฟรี / ฿0', '฿500–3,000+'],
                ['เหมาะสำหรับ Freelance', '✓ ออกแบบมาเลย', '✗ ทั่วไป', '✗ ใหญ่เกินไป'],
                ['ไม่ต้องสมัคร', '✓', '✓', '✗ ต้องสมัคร'],
            ],
        },
        useCases: [
            {
                title: 'สำหรับ Freelance ทุกประเภท',
                description:
                    'นักออกแบบ / Graphic Designer\nส่งใบเสนอราคาก่อนรับงาน ออกใบแจ้งหนี้เมื่อส่งงาน และใบเสร็จเมื่อได้รับเงิน ครบ Workflow ในเครื่องมือเดียว',
            },
            {
                title: 'นักพัฒนาซอฟต์แวร์ / Programmer',
                description:
                    'ออกใบตรวจรับงานเมื่อ Deliver Feature หรือ Project เสร็จ เป็นเอกสารที่ลูกค้าต้องการก่อนโอนเงิน',
            },
            {
                title: 'ช่างภาพ / Videographer',
                description:
                    'สร้างใบเสนอราคาสำหรับงาน Shoot ใบแจ้งหนี้สำหรับ Final File และใบเสร็จเมื่อได้รับเงิน แต่ละใบใช้เวลาไม่ถึง 2 นาที',
            },
            {
                title: 'นักแปล / Writer / Content Creator',
                description:
                    'คิดค่าบริการแบบรายคำ รายหน้า หรือรายโปรเจกต์ ใส่หน่วยเองได้ ระบบคำนวณให้อัตโนมัติ',
            },
            {
                title: 'ที่ปรึกษาอิสระ / Consultant',
                description:
                    'Invoice รายเดือน ใบเสนอราคาสำหรับโปรเจกต์ใหม่ และใบตรวจรับงานสำหรับ Milestone ทำได้หมดในที่เดียว',
            },
        ],
        faq: [
            {
                question: 'EZY-Doc ฟรีจริงๆ ไหม?',
                answer: 'ใช่ ฟรีทั้งหมด EZY-Doc อยู่ได้ด้วยรายได้จากโฆษณา ไม่มีค่าบริการซ่อนอยู่ ไม่มีการจำกัดการใช้งาน และไม่ต้องใช้บัตรเครดิต',
            },
            {
                question: 'ต้องสมัครสมาชิกไหม?',
                answer: 'ไม่ต้องเลย ไม่ต้องใส่อีเมล ไม่ต้องตั้งรหัสผ่าน เปิดเครื่องมือแล้วเริ่มใช้งานได้ทันที',
            },
            {
                question: 'ข้อมูลของฉันถูกเก็บที่ไหน?',
                answer: 'ข้อมูลของคุณไม่ถูกส่งออกจากเบราว์เซอร์เลย ข้อมูลทั้งหมด — ข้อมูลบริษัท ข้อมูลลูกค้า รายการสินค้า และโลโก้ — อยู่ใน Session ของเบราว์เซอร์เท่านั้น เมื่อปิดหรือรีเฟรชหน้า ข้อมูลจะถูกลบ แนะนำให้ดาวน์โหลด PDF ก่อนออกจากหน้า',
            },
            {
                question: 'รองรับภาษาไทยไหม?',
                answer: 'รองรับทั้งภาษาไทยและอังกฤษ ทั้งในส่วนของหน้าเว็บและเอกสาร PDF คุณเลือกภาษาของ PDF ได้แยกจากภาษาของหน้าเว็บ',
            },
            {
                question: 'รองรับ VAT 7% ไหม?',
                answer: 'รองรับ เปิดใช้งานภาษีได้ที่แท็บ Config ใส่อัตราภาษีที่ต้องการ (default 7% สำหรับ VAT ไทย) ระบบจะคำนวณและแสดงในเอกสาร PDF',
            },
            {
                question: 'ใส่โลโก้ได้ไหม?',
                answer: 'ได้ อัปโหลดไฟล์ PNG, JPG หรือ WebP ระบบจะบีบอัดไฟล์อัตโนมัติและฝังลงใน PDF ให้',
            },
            {
                question: 'รองรับเอกสารประเภทอะไรบ้าง?',
                answer: '4 ประเภท: ใบเสนอราคา (QO) ใบแจ้งหนี้ (IV) ใบตรวจรับงาน (AC) และใบเสร็จรับเงิน (RC) แต่ละประเภทมีเลขที่เอกสารสร้างให้อัตโนมัติ',
            },
            {
                question: 'ส่งเอกสารตรงจาก EZY-Doc ได้ไหม?',
                answer: 'ยังไม่ได้ในเวอร์ชันนี้ ให้ดาวน์โหลด PDF แล้วส่งผ่านอีเมล LINE หรือช่องทางที่ต้องการ ฟีเจอร์การแชร์ลิงก์โดยตรงอยู่ใน Roadmap',
            },
            {
                question: 'ถ้ากรอกผิด แก้ได้ไหม?',
                answer: 'ได้ กลับไปแก้ไขในตัว Editor แล้ว Export ใหม่ ตราบใดที่ยังไม่ได้รีเฟรชหน้า ข้อมูลยังอยู่ครบ',
            },
            {
                question: 'เอกสารจาก EZY-Doc ใช้ทางกฎหมายได้ไหม?',
                answer: 'EZY-Doc สร้างเอกสารตามรูปแบบมาตรฐานของเอกสารธุรกิจไทย อย่างไรก็ตาม สำหรับใบกำกับภาษีอย่างเป็นทางการที่ต้องจดทะเบียนกับกรมสรรพากร ควรปรึกษานักบัญชีหรือที่ปรึกษาภาษี สำหรับธุรกรรมทั่วไประหว่างคู่ค้า เอกสารจาก EZY-Doc ถูกใช้งานและยอมรับกันอย่างแพร่หลาย',
            },
        ],
        footerCta: {
            title: 'พร้อมส่งเอกสารในอีก 3 นาทีข้างหน้าแล้วหรือยัง?',
            subtitle:
                'ไม่ต้องสมัคร ไม่ต้อง Download Template ไม่ต้องจัด Format เอง แค่เปิด กรอก และ Export',
            cta: '→ เริ่มสร้างเอกสารแรกของคุณ',
        },
    },
};
