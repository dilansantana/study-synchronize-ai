
export const validCertifications = [
  'comptia-security-plus',
  'cisco-ccna',
  'aws-solutions-architect',
  'microsoft-azure-administrator',
  'comptia-network-plus',
  'pmp',
  'comptia-a-plus',
  'splunk',
  'cissp',
  'ceh',
  'okta-certified-professional',
  'okta-certified-administrator',
  'aws-certified-developer',
  'aws-certified-cloud-practitioner',
  'google-cloud-professional-architect',
  'microsoft-azure-fundamentals',
  'microsoft-365-fundamentals',
  'comptia-linux-plus',
  'comptia-cloud-plus',
  'comptia-cysa-plus',
  'comptia-pentest-plus',
  'isaca-cisa',
  'isaca-cism',
  'salesforce-administrator',
  'salesforce-developer',
  'vmware-vcp',
  'itil-foundation',
  'scrum-master',
  'servicenow-admin'
];

export const certificationNames: Record<string, string> = {
  'comptia-security-plus': 'CompTIA Security+',
  'cisco-ccna': 'Cisco CCNA',
  'aws-solutions-architect': 'AWS Solutions Architect',
  'microsoft-azure-administrator': 'Microsoft Azure Administrator',
  'comptia-network-plus': 'CompTIA Network+',
  'pmp': 'Project Management Professional (PMP)',
  'comptia-a-plus': 'CompTIA A+',
  'splunk': 'Splunk Certification',
  'cissp': 'CISSP (Certified Information Systems Security Professional)',
  'ceh': 'Certified Ethical Hacker (CEH)',
  'okta-certified-professional': 'Okta Certified Professional',
  'okta-certified-administrator': 'Okta Certified Administrator',
  'aws-certified-developer': 'AWS Certified Developer - Associate',
  'aws-certified-cloud-practitioner': 'AWS Certified Cloud Practitioner',
  'google-cloud-professional-architect': 'Google Cloud Professional Architect',
  'microsoft-azure-fundamentals': 'Microsoft Azure Fundamentals (AZ-900)',
  'microsoft-365-fundamentals': 'Microsoft 365 Fundamentals (MS-900)',
  'comptia-linux-plus': 'CompTIA Linux+',
  'comptia-cloud-plus': 'CompTIA Cloud+',
  'comptia-cysa-plus': 'CompTIA CySA+',
  'comptia-pentest-plus': 'CompTIA PenTest+',
  'isaca-cisa': 'ISACA CISA (Certified Information Systems Auditor)',
  'isaca-cism': 'ISACA CISM (Certified Information Security Manager)',
  'salesforce-administrator': 'Salesforce Certified Administrator',
  'salesforce-developer': 'Salesforce Certified Platform Developer',
  'vmware-vcp': 'VMware Certified Professional (VCP)',
  'itil-foundation': 'ITIL Foundation',
  'scrum-master': 'Certified Scrum Master',
  'servicenow-admin': 'ServiceNow Certified System Administrator'
};

export interface Certification {
  id: string;
  name: string;
  category: string;
  source?: string;
  description?: string;
}

export const popularCertifications: Certification[] = [
  { id: 'comptia-security-plus', name: 'CompTIA Security+', category: 'Security' },
  { id: 'cisco-ccna', name: 'Cisco CCNA', category: 'Networking' },
  { id: 'aws-solutions-architect', name: 'AWS Solutions Architect', category: 'Cloud' },
  { id: 'microsoft-azure-administrator', name: 'Microsoft Azure Administrator', category: 'Cloud' },
  { id: 'comptia-network-plus', name: 'CompTIA Network+', category: 'Networking' },
  { id: 'pmp', name: 'Project Management Professional (PMP)', category: 'Management' },
  { id: 'comptia-a-plus', name: 'CompTIA A+', category: 'IT Fundamentals' },
  { id: 'cissp', name: 'CISSP', category: 'Security' },
  { id: 'okta-certified-professional', name: 'Okta Certified Professional', category: 'Identity' },
  { id: 'aws-certified-cloud-practitioner', name: 'AWS Cloud Practitioner', category: 'Cloud' },
  { id: 'salesforce-administrator', name: 'Salesforce Administrator', category: 'CRM' },
  { id: 'itil-foundation', name: 'ITIL Foundation', category: 'Service Management' },
];
