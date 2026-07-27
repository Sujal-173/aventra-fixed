import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

interface CareerApplicationEmailProps {
  name: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  position: string;
  experience: string;
  skills?: string;
  college?: string;
  degree?: string;
  gradYear?: string;
  portfolioWebsite?: string;
  gitHub?: string;
  linkedIn?: string;
  whyJoin: string;
  bestProject: string;
  resumeBackupUrl: string;
  portfolioBackupUrl?: string;
  applicationDate?: string;
}

export function CareerApplicationEmail({
  name,
  email,
  phone,
  city,
  country,
  position,
  experience,
  skills,
  college,
  degree,
  gradYear,
  portfolioWebsite,
  gitHub,
  linkedIn,
  whyJoin,
  bestProject,
  resumeBackupUrl,
  portfolioBackupUrl,
  applicationDate,
}: CareerApplicationEmailProps) {
  const formattedDate =
    applicationDate ||
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const logoUrl = "https://aventracreative.com/images/logo-icon-transparent.png";

  return (
    <Html lang="en">
      <Head />
      <Preview>New Aventra Career Application: {name} - {position}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Block */}
          <Section style={headerSection}>
            <Row style={{ padding: "0 24px" }}>
              <Column align="left" style={{ verticalAlign: "middle" }}>
                <Img
                  src={logoUrl}
                  width="40"
                  height="40"
                  alt="Aventra Logo"
                  style={logo}
                />
              </Column>
              <Column align="right" style={{ verticalAlign: "middle" }}>
                <Text style={headerBrandName}>AVENTRA CREATIVE</Text>
              </Column>
            </Row>
          </Section>

          {/* Intro Banner */}
          <Section style={bannerSection}>
            <Heading style={bannerTitle}>New Application Received</Heading>
            <Text style={bannerSubtitle}>
              Position: <span style={{ fontWeight: 700 }}>{position}</span>
            </Text>
          </Section>

          {/* Main Content Area */}
          <Section style={contentSection}>
            {/* Applicant Basic Details */}
            <Heading as="h2" style={sectionHeading}>
              Candidate Profile
            </Heading>
            <table style={detailsTable}>
              <tbody>
                <tr>
                  <td style={tableLabel}>Full Name</td>
                  <td style={tableValue}>{name}</td>
                </tr>
                <tr>
                  <td style={tableLabel}>Email Address</td>
                  <td style={tableValue}>
                    <Link href={`mailto:${email}`} style={purpleLink}>
                      {email}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={tableLabel}>Phone Number</td>
                  <td style={tableValue}>{phone}</td>
                </tr>
                {(city || country) && (
                  <tr>
                    <td style={tableLabel}>Location</td>
                    <td style={tableValue}>
                      {[city, country].filter(Boolean).join(", ")}
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabel}>Experience</td>
                  <td style={tableValue}>{experience}</td>
                </tr>
                <tr>
                  <td style={tableLabel}>Skills</td>
                  <td style={tableValue}>{skills || "Not specified"}</td>
                </tr>
                {(college || degree || gradYear) && (
                  <tr>
                    <td style={tableLabel}>Education</td>
                    <td style={tableValue}>
                      {[degree, college, gradYear ? `Class of ${gradYear}` : ""]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabel}>Submitted On</td>
                  <td style={tableValue}>{formattedDate}</td>
                </tr>
                <tr>
                  <td style={tableLabel}>Resume Backup URL</td>
                  <td style={tableValue}>
                    <Link href={resumeBackupUrl} style={purpleLink}>
                      {resumeBackupUrl}
                    </Link>
                  </td>
                </tr>
                {portfolioBackupUrl && (
                  <tr>
                    <td style={tableLabel}>Portfolio Backup URL</td>
                    <td style={tableValue}>
                      <Link href={portfolioBackupUrl} style={purpleLink}>
                        {portfolioBackupUrl}
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Hr style={divider} />

            {/* Social & Professional Profiles */}
            <Heading as="h2" style={sectionHeading}>
              Professional Links
            </Heading>
            <Row style={{ marginBottom: "20px" }}>
              <Column>
                <div style={linksGrid}>
                  {portfolioWebsite && (
                    <div style={linkPill}>
                      <span style={{ fontWeight: 600, color: "#4b5563" }}>Portfolio: </span>
                      <Link href={portfolioWebsite} style={pillUrl}>
                        View Website
                      </Link>
                    </div>
                  )}
                  {gitHub && (
                    <div style={linkPill}>
                      <span style={{ fontWeight: 600, color: "#4b5563" }}>GitHub: </span>
                      <Link href={gitHub} style={pillUrl}>
                        github.com
                      </Link>
                    </div>
                  )}
                  {linkedIn && (
                    <div style={linkPill}>
                      <span style={{ fontWeight: 600, color: "#4b5563" }}>LinkedIn: </span>
                      <Link href={linkedIn} style={pillUrl}>
                        linkedin.com
                      </Link>
                    </div>
                  )}
                </div>
              </Column>
            </Row>

            <Hr style={divider} />

            {/* Questionnaire Responses */}
            <Heading as="h2" style={sectionHeading}>
              Application Questionnaire
            </Heading>
            
            <div style={questionBlock}>
              <Text style={questionTitle}>Why do you want to join Aventra Creative?</Text>
              <Text style={questionAnswer}>{whyJoin}</Text>
            </div>

            <div style={questionBlock}>
              <Text style={questionTitle}>Tell us about your best project.</Text>
              <Text style={questionAnswer}>{bestProject}</Text>
            </div>

            <Hr style={divider} />

            {/* Documents Backup */}
            <Heading as="h2" style={sectionHeading}>
              Document Cloudinary Backups
            </Heading>

            <div style={documentContainer}>
              <Row style={{ padding: "12px 16px" }}>
                <Column align="left" style={{ verticalAlign: "middle" }}>
                  <Text style={docTitle}>Resume Backup</Text>
                  <Text style={docSubtitle}>Cloudinary secure backup storage</Text>
                </Column>
                <Column align="right" style={{ verticalAlign: "middle" }}>
                  <Link href={resumeBackupUrl} style={downloadBtn}>
                    Open Link
                  </Link>
                </Column>
              </Row>
            </div>

            {portfolioBackupUrl && (
              <div style={{ ...documentContainer, marginTop: "12px" }}>
                <Row style={{ padding: "12px 16px" }}>
                  <Column align="left" style={{ verticalAlign: "middle" }}>
                    <Text style={docTitle}>Portfolio Backup</Text>
                    <Text style={docSubtitle}>Cloudinary secure backup storage</Text>
                  </Column>
                  <Column align="right" style={{ verticalAlign: "middle" }}>
                    <Link href={portfolioBackupUrl} style={downloadBtn}>
                      Open Link
                    </Link>
                  </Column>
                </Row>
              </div>
            )}
          </Section>

          {/* Footer Section */}
          <Section style={footerSection}>
            <Text style={footerText}>
              This application was securely received via the **Aventra Careers Portal**.
            </Text>
            <Text style={{ ...footerText, marginTop: "6px" }}>
              © {new Date().getFullYear()} Aventra Creative. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styling system
const main = {
  backgroundColor: "#f4f3ff",
  fontFamily: 'Outfit, Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 20px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "16px",
  border: "1px solid #e5dfff",
  boxShadow: "0 10px 25px -5px rgba(91, 33, 231, 0.05), 0 8px 16px -8px rgba(91, 33, 231, 0.05)",
  overflow: "hidden" as const,
};

const headerSection = {
  backgroundColor: "#5b21e7",
  padding: "16px 0",
};

const logo = {
  display: "block" as const,
  borderRadius: "8px",
};

const headerBrandName = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  margin: 0,
};

const bannerSection = {
  backgroundColor: "#5b21e7",
  backgroundImage: "linear-gradient(to bottom, #5b21e7, #4b14d8)",
  textAlign: "center" as const,
  padding: "0 24px 32px 24px",
  color: "#ffffff",
};

const bannerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: 800,
  margin: 0,
  letterSpacing: "-0.02em",
};

const bannerSubtitle = {
  color: "#d9cbff",
  fontSize: "15px",
  margin: "8px 0 0 0",
};

const contentSection = {
  padding: "32px 24px",
};

const sectionHeading = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: 700,
  margin: "0 0 16px 0",
  letterSpacing: "-0.01em",
  textTransform: "uppercase" as const,
};

const detailsTable = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginBottom: "10px",
};

const tableLabel = {
  padding: "10px 0",
  fontSize: "14px",
  color: "#6b7280",
  fontWeight: 500,
  width: "30%",
  borderBottom: "1px solid #f3f4f6",
  verticalAlign: "top" as const,
};

const tableValue = {
  padding: "10px 0 10px 10px",
  fontSize: "14px",
  color: "#111827",
  fontWeight: 600,
  width: "70%",
  borderBottom: "1px solid #f3f4f6",
  verticalAlign: "top" as const,
  wordBreak: "break-all" as const,
};

const purpleLink = {
  color: "#5b21e7",
  textDecoration: "none",
};

const divider = {
  borderColor: "#f3f4f6",
  margin: "24px 0",
};

const linksGrid = {
  display: "inline-block" as const,
  width: "100%",
};

const linkPill = {
  display: "inline-block" as const,
  backgroundColor: "#f5f3ff",
  border: "1px solid #e5dfff",
  borderRadius: "8px",
  padding: "6px 12px",
  marginRight: "8px",
  marginBottom: "8px",
  fontSize: "13px",
};

const pillUrl = {
  color: "#5b21e7",
  textDecoration: "none",
  fontWeight: 600,
};

const questionBlock = {
  backgroundColor: "#fbfbfe",
  border: "1px solid #f0edf9",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "16px",
};

const questionTitle = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#4b5563",
  margin: "0 0 6px 0",
};

const questionAnswer = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#111827",
  margin: 0,
  whiteSpace: "pre-wrap" as const,
};

const documentContainer = {
  backgroundColor: "#fafafd",
  border: "1px dashed #d9cbff",
  borderRadius: "10px",
};

const docTitle = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#1f2937",
  margin: 0,
};

const docSubtitle = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "2px 0 0 0",
};

const downloadBtn = {
  backgroundColor: "#5b21e7",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block" as const,
};

const footerSection = {
  backgroundColor: "#fafafd",
  borderTop: "1px solid #f3f4f6",
  padding: "24px 24px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: 0,
  lineHeight: "1.5",
};
