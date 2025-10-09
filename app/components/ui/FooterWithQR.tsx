"use client";

import React, { useRef, useState } from "react";
import { Modal, Button } from "antd";
import { FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DownloadCloudIcon } from "lucide-react";


export function FooterWithQR() {
  const [open, setOpen] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const pdf = new jsPDF("p", "pt", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 20, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 20;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 20, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("FloodInfo.pdf");
  };



  return (
    <>
      {/* QR Button */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 0,
          right: 10,
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          onClick={() => setOpen(true)}
          style={{
            position: "absolute",
            right: 30,
            bottom: 70,
            background: "white",
            borderRadius: "50%",
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <FaQrcode size={22} color="#1e3a8a" />
        </div>
      </div>

      {/* Modal with QR */}
      <Modal
        title="Scan to Download Flood Info PDF"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div style={{ textAlign: "center", padding: 20 }}>
          <QRCodeCanvas
            value={`${window.location.origin}/download-pdf`}
            size={180}
            fgColor="#1e3a8a"
            includeMargin
          />
          <p style={{ marginTop: 16, color: "#374151" }}>
            Scan this QR to download the PDF.
          </p>
        </div>
        <Button key="download" style={{width:'100%',display:'flex', alignItems:'center', justifyContent:"center"}} type="primary" onClick={handleDownloadPDF}>
            Download Now &nbsp; <DownloadCloudIcon />
          </Button>
      </Modal>

      {/* Hidden div for PDF generation */}
      <div ref={pdfRef} style={{ position: "absolute", top: -9999, left: -9999 }}>
        <div
          id="flood-preparedness-guide"
          style={{
            maxWidth: "900px",
            margin: "80px auto",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "12px",
            lineHeight: "1.6",
            color: "#111827",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "28px",
              marginBottom: "20px",
              color: "#0b3d91",
            }}
          >
            Flood Preparedness Guide
          </h1>

          {/* ---------- Section 1: Emergency Kit ---------- */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>1. Emergency Kit Essentials</h2>
            <p>
              Being ready with an emergency kit can make a huge difference during
              flood situations. Prepare a waterproof container and store essential
              items that can support your family for at least 72 hours.
            </p>

            <h3>✅ Recommended Items:</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>Water — at least 3 litres per person per day</li>
              <li>Non-perishable food (ready-to-eat meals, canned goods)</li>
              <li>First aid kit and prescribed medications</li>
              <li>Flashlight with extra batteries</li>
              <li>Power bank or portable charger</li>
              <li>Important documents in waterproof bags</li>
              <li>Basic hygiene supplies (soap, sanitizer, tissues)</li>
              <li>Whistle for signaling help</li>
              <li>Extra clothing and blankets</li>
              <li>Cash and local maps</li>
            </ul>

            <p>
              📦 Keep your emergency kit in an accessible place and check it every 6
              months to replace expired food, batteries, and medicines.
            </p>
          </section>

          {/* ---------- Section 2: Family Emergency Plan ---------- */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>2. Family Emergency Plan</h2>
            <p>
              Floods can separate families or cut off communication. A clear family
              plan ensures everyone knows what to do and where to go when a flood
              warning is issued.
            </p>

            <h3>🧭 Key Steps:</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>Identify the safest evacuation routes to higher ground.</li>
              <li>
                Assign meeting points — one near home and one outside the
                neighborhood.
              </li>
              <li>
                Save emergency contacts in all family members’ phones and write
                them on paper too.
              </li>
              <li>
                Decide how to care for pets and elderly family members during an
                evacuation.
              </li>
              <li>Learn how to turn off gas, electricity, and water safely.</li>
              <li>
                Practice the evacuation drill regularly — especially with children.
              </li>
            </ul>

            <p>
              📋 Communication is key — keep a list of emergency numbers (local
              authorities, hospitals, shelters, and relatives) handy.
            </p>
          </section>

          {/* ---------- Section 3: Protecting Your Property ---------- */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>3. Protecting Your Property</h2>
            <p>
              Simple actions before and during a flood can reduce property damage
              and financial losses. Flood prevention starts with good maintenance
              and planning.
            </p>

            <h3>🏠 Before a Flood:</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>Seal basement walls with waterproof compounds.</li>
              <li>Install check valves in plumbing to prevent backflow.</li>
              <li>Clear gutters, drains, and downspouts.</li>
              <li>
                Elevate electrical appliances and switches at least 1 foot above
                expected flood level.
              </li>
              <li>Move valuables and furniture to higher floors.</li>
            </ul>

            <h3>🌊 During a Flood:</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>Turn off gas and electricity if instructed by authorities.</li>
              <li>Never walk or drive through moving water.</li>
              <li>
                Keep listening to official updates through radio, TV, or trusted
                apps.
              </li>
              <li>Move to higher ground immediately.</li>
            </ul>

            <h3>🔧 After a Flood:</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>Wait until authorities declare it safe to return home.</li>
              <li>
                Take photos of all damages for insurance and recovery claims.
              </li>
              <li>Do not use electrical appliances until checked by an expert.</li>
              <li>Disinfect and dry all areas to prevent mold growth.</li>
            </ul>

            <p>
              🛠️ Consider flood insurance and make structural improvements to reduce
              future risk.
            </p>
          </section>

          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>4. Personal Safety Measures</h2>
            <p>
              Essential safety actions to remember before, during, and after floods.
              Always assume floodwater is contaminated and take protective steps to
              stay safe.
            </p>

            <ul style={{ marginLeft: "20px", lineHeight: 1.8 }}>
              <li>
                Assume all floodwater is contaminated — do not drink, swim, or let
                children or pets near it.
              </li>
              <li>
                Use only bottled or pre-stored safe water. If unsure, boil for 1 minute.
                If boiling isn’t possible, disinfect with 2 drops of unscented household
                bleach per litre (4 drops if cloudy).
              </li>
              <li>
                Wear gloves and waterproof boots if entering floodwater. Avoid walking
                alone and keep communication open.
              </li>
              <li>
                Cover cuts with waterproof dressings and wash hands frequently with
                soap or sanitiser.
              </li>
              <li>
                Eat only sealed or canned food. Discard any food touched by floodwater.
              </li>
              <li>
                If toilets or septic systems fail, use lined bags or buckets for waste
                and seal until safe disposal.
              </li>
              <li>
                Follow SES and BOM alerts closely for boil-water advisories and
                evacuation orders.
              </li>
            </ul>

            <p>
              💡 <strong>Tip:</strong> Always treat floodwater as unsafe. Keep
              disinfectants, gloves, and bottled water ready in advance.
            </p>
          </section>

          {/* Section 5: Health and Hygiene */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>5. Health and Hygiene</h2>
            <p>
              Maintaining health and hygiene during and after floods prevents disease
              outbreaks and protects your family’s wellbeing.
            </p>

            <ul style={{ marginLeft: "20px", lineHeight: 1.8 }}>
              <li>
                Boil water for 1 minute before drinking or disinfect with 2 drops of
                bleach per litre (4 if cloudy). Wait 30 minutes before use.
              </li>
              <li>
                Store clean drinking water separately and label clearly.
              </li>
              <li>
                Wash hands with soap and safe water before eating and after toilet use.
              </li>
              <li>
                Eat only sealed or canned food. Discard anything that touched
                floodwater.
              </li>
              <li>
                Clean utensils and cooking surfaces with disinfected water.
              </li>
              <li>
                If sanitation fails, use lined bags or buckets for waste and seal them
                until disposal.
              </li>
              <li>
                Avoid direct contact with floodwater to prevent infections.
              </li>
            </ul>

            <p>
              💡 <strong>Tip:</strong> Keep a hygiene kit with soap, sanitiser, gloves,
              and disinfectants in your emergency kit.
            </p>
          </section>

          {/* Section 6: Mental and Emotional Wellbeing */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>6. Mental and Emotional Wellbeing</h2>
            <p>
              Floods can take a toll on emotional health. Staying connected and using
              simple coping techniques can help manage stress and anxiety.
            </p>

            <ul style={{ marginLeft: "20px", lineHeight: 1.8 }}>
              <li>
                Feeling shock, fear, or sadness after a flood is normal — seek help if
                distress persists.
              </li>
              <li>
                Stay connected with family, friends, or services like{" "}
                <a
                  href="https://www.beyondblue.org.au/mental-health/natural-disasters"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Beyond Blue
                </a>{" "}
                or{" "}
                <a
                  href="https://www.redcross.org.au/emergencies/coping-after-a-crisis/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Australian Red Cross
                </a>
                .
              </li>
              <li>Limit exposure to distressing news — check updates only at set times.</li>
              <li>
                Maintain routines like regular meals, exercise, and sleep to support
                stability.
              </li>
              <li>
                Help children feel safe with simple explanations and limited media
                exposure.
              </li>
              <li>
                Try grounding exercises — deep breathing (inhale 4s, exhale 6s), gentle
                stretches, or naming 5 things you can see or hear.
              </li>
              <li>
                Contact state health lines for mental health support. In danger, call{" "}
                <strong>000</strong>.
              </li>
            </ul>

            <p>
              💡 <strong>Tip:</strong> Take breaks, connect with loved ones, and
              practice calm breathing. Seeking support early helps recovery.
            </p>
          </section>

          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>7. Clean & Disinfection</h2>
            <p>
              Steps to safely sanitize your home after flooding. These actions help
              remove contaminants and prevent mould growth.
            </p>

            <ul style={{ marginLeft: "20px", lineHeight: 1.8 }}>
              <li>
                Wear gloves, boots, long sleeves, and a mask to protect yourself from
                contaminated water, mud, and mould.
              </li>
              <li>
                Remove all mud, silt, and flood debris completely before beginning
                disinfection procedures.
              </li>
              <li>
                Clean surfaces with warm, soapy water, then apply a bleach solution
                (1 cup bleach to 4L water).
              </li>
              <li>
                Discard items that cannot be properly cleaned — mattresses, carpets,
                and upholstered furniture.
              </li>
              <li>
                Use fans, dehumidifiers, and natural ventilation to dry all areas
                thoroughly.
              </li>
              <li>
                Watch for mould growth on walls, ceilings, and furniture. Seek
                professional help if the area is large.
              </li>
              <li>
                Dispose of contaminated waste according to your local council’s
                flood clean-up guidelines.
              </li>
              <li>
                Check refrigerators and freezers — discard any food that has touched
                floodwater or lost power for more than 4 hours.
              </li>
              <li>
                Disinfect children’s toys, utensils, and food surfaces with boiling
                water or bleach solution.
              </li>
            </ul>

            <p>
              💡 <strong>Tip:</strong> For detailed guidance, visit{" "}
              <a
                href="https://www.health.gov.au/topics/environmental-health/emergencies/floods"
                target="_blank"
                rel="noopener noreferrer"
              >
                Australian Department of Health – Flood Cleaning Advice
              </a>
              .
            </p>
          </section>

          {/* Section 2: Safety Check */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>8. Safety Check</h2>
            <p>
              Before re-entering your property, ensure that it’s structurally safe
              and free from immediate hazards.
            </p>

            <ul style={{ marginLeft: "20px", lineHeight: 1.8 }}>
              <li>Check for structural damage before entering your home.</li>
              <li>Avoid downed power lines and report them immediately.</li>
              <li>Do not use electrical appliances until inspected by a professional.</li>
              <li>Ventilate the area to remove gas or fumes before staying inside.</li>
            </ul>

            <p>
              ⚠️ <strong>Note:</strong> Always prioritize your safety before
              beginning flood recovery. If unsure, contact local authorities or
              emergency services for guidance.
            </p>
          </section>

          {/* Section 3: Mental and Emotional Support */}
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#0b3d91" }}>9. Mental and Emotional Support</h2>
            <p>
              Taking care of your mental health after a flood is just as important as
              physical recovery. Stay connected, seek help, and use positive coping
              techniques.
            </p>

            <ul style={{ marginLeft: "20px", lineHeight: 1.8 }}>
              <li>Talk to family and friends about your experiences to relieve stress.</li>
              <li>Seek professional counselling if you feel overwhelmed or anxious.</li>
              <li>Practice relaxation techniques like deep breathing or meditation.</li>
              <li>Join local community support groups for shared healing.</li>
              <li>Keep a journal to process your thoughts and emotions.</li>
            </ul>

            <p>
              🌱 <strong>Reminder:</strong> Healing takes time — reach out, stay
              connected, and take small steps each day.
            </p>
          </section>

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontStyle: "italic",
              color: "#555",
            }}
          >
            <p>
              🌧️ “Be Prepared. Stay Safe. Recover Stronger.” — Flood Fighter
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
