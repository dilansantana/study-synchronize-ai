
export const validCertifications = [
  // Cybersecurity
  'comptia-security-plus',
  'cissp',
  'cism',
  'cisa',
  'ceh',
  'cysa-plus',
  'pentest-plus',
  'casp-plus',
  'gsec',
  'sscp',
  'ccsp',
  'oscp',
  
  // Cloud Computing
  'aws-solutions-architect',
  'aws-certified-developer',
  'aws-certified-cloud-practitioner',
  'aws-sysops-administrator',
  'aws-devops-engineer',
  'google-cloud-professional-architect', 
  'google-cloud-associate-engineer',
  'google-cloud-professional-data-engineer',
  'microsoft-azure-fundamentals',
  'microsoft-azure-administrator',
  'microsoft-azure-solutions-architect',
  'microsoft-azure-data-scientist',
  'microsoft-azure-developer',
  
  // Networking
  'cisco-ccna',
  'cisco-ccnp',
  'comptia-network-plus',
  'jncia-junos',
  'acma',
  'ccnp-enterprise',
  'ccie',
  'comptia-cloud-plus',
  'juniper-jncis',
  
  // Systems & IT Fundamentals
  'comptia-a-plus',
  'comptia-linux-plus',
  'rhcsa',
  'rhce',
  'lpic-1',
  'mcsa',
  'mcse',
  
  // Data & Analytics
  'certified-data-professional',
  'azure-data-scientist-associate',
  'sas-certified-data-scientist',
  'ibm-data-science-professional',
  'cloudera-certified-data-analyst',
  'tableau-desktop-specialist',
  'databricks-lakehouse-fundamentals',
  'azure-data-engineer',
  
  // Project Management
  'pmp',
  'csm',
  'capm',
  'prince2-foundation',
  'prince2-practitioner',
  'pmi-acp',
  'itil-foundation',
  'six-sigma-green-belt',
  'six-sigma-black-belt',
  
  // Identity & Access Management
  'okta-certified-professional',
  'okta-certified-administrator',
  'okta-certified-consultant',
  'forgerock-identity-management',
  'certified-identity-professional',
  
  // DevOps & Platform Engineering
  'aws-certified-devops-engineer',
  'docker-certified-associate',
  'kubernetes-administrator',
  'terraform-associate',
  'gitlab-certified-associate',
  'hashicorp-certified-terraform-associate',
  
  // Vendor-Specific Others
  'salesforce-administrator',
  'salesforce-developer',
  'vmware-vcp',
  'servicenow-admin',
  'oracle-certified-associate',
  'oracle-certified-professional'
];

export const certificationNames: Record<string, string> = {
  // Cybersecurity
  'comptia-security-plus': 'CompTIA Security+',
  'cissp': 'Certified Information Systems Security Professional (CISSP)',
  'cism': 'Certified Information Security Manager (CISM)',
  'cisa': 'Certified Information Systems Auditor (CISA)',
  'ceh': 'Certified Ethical Hacker (CEH)',
  'cysa-plus': 'CompTIA CySA+ (Cybersecurity Analyst)',
  'pentest-plus': 'CompTIA PenTest+',
  'casp-plus': 'CompTIA CASP+ (Advanced Security Practitioner)',
  'gsec': 'GIAC Security Essentials (GSEC)',
  'sscp': 'Systems Security Certified Practitioner (SSCP)',
  'ccsp': 'Certified Cloud Security Professional (CCSP)',
  'oscp': 'Offensive Security Certified Professional (OSCP)',
  
  // Cloud Computing
  'aws-solutions-architect': 'AWS Certified Solutions Architect',
  'aws-certified-developer': 'AWS Certified Developer - Associate',
  'aws-certified-cloud-practitioner': 'AWS Certified Cloud Practitioner',
  'aws-sysops-administrator': 'AWS Certified SysOps Administrator',
  'aws-devops-engineer': 'AWS Certified DevOps Engineer - Professional',
  'google-cloud-professional-architect': 'Google Cloud Professional Cloud Architect',
  'google-cloud-associate-engineer': 'Google Cloud Associate Cloud Engineer',
  'google-cloud-professional-data-engineer': 'Google Cloud Professional Data Engineer',
  'microsoft-azure-fundamentals': 'Microsoft Azure Fundamentals (AZ-900)',
  'microsoft-azure-administrator': 'Microsoft Azure Administrator (AZ-104)',
  'microsoft-azure-solutions-architect': 'Microsoft Azure Solutions Architect (AZ-305)',
  'microsoft-azure-data-scientist': 'Microsoft Azure Data Scientist Associate (DP-100)',
  'microsoft-azure-developer': 'Microsoft Azure Developer Associate (AZ-204)',
  
  // Networking
  'cisco-ccna': 'Cisco Certified Network Associate (CCNA)',
  'cisco-ccnp': 'Cisco Certified Network Professional (CCNP)',
  'comptia-network-plus': 'CompTIA Network+',
  'jncia-junos': 'Juniper Networks Certified Associate (JNCIA-Junos)',
  'acma': 'Aruba Certified Mobility Associate (ACMA)',
  'ccnp-enterprise': 'Cisco CCNP Enterprise',
  'ccie': 'Cisco Certified Internetwork Expert (CCIE)',
  'comptia-cloud-plus': 'CompTIA Cloud+',
  'juniper-jncis': 'Juniper Networks Certified Specialist (JNCIS)',
  
  // Systems & IT Fundamentals
  'comptia-a-plus': 'CompTIA A+',
  'comptia-linux-plus': 'CompTIA Linux+',
  'rhcsa': 'Red Hat Certified System Administrator (RHCSA)',
  'rhce': 'Red Hat Certified Engineer (RHCE)',
  'lpic-1': 'Linux Professional Institute Certification (LPIC-1)',
  'mcsa': 'Microsoft Certified Solutions Associate (MCSA)',
  'mcse': 'Microsoft Certified Solutions Expert (MCSE)',
  
  // Data & Analytics
  'certified-data-professional': 'Certified Data Professional (CDP)',
  'azure-data-scientist-associate': 'Microsoft Azure Data Scientist Associate',
  'sas-certified-data-scientist': 'SAS Certified Data Scientist',
  'ibm-data-science-professional': 'IBM Data Science Professional Certificate',
  'cloudera-certified-data-analyst': 'Cloudera Certified Data Analyst',
  'tableau-desktop-specialist': 'Tableau Desktop Specialist',
  'databricks-lakehouse-fundamentals': 'Databricks Lakehouse Fundamentals',
  'azure-data-engineer': 'Azure Data Engineer Associate',
  
  // Project Management
  'pmp': 'Project Management Professional (PMP)',
  'csm': 'Certified ScrumMaster (CSM)',
  'capm': 'Certified Associate in Project Management (CAPM)',
  'prince2-foundation': 'PRINCE2 Foundation',
  'prince2-practitioner': 'PRINCE2 Practitioner',
  'pmi-acp': 'PMI Agile Certified Practitioner (PMI-ACP)',
  'itil-foundation': 'ITIL Foundation',
  'six-sigma-green-belt': 'Six Sigma Green Belt',
  'six-sigma-black-belt': 'Six Sigma Black Belt',
  
  // Identity & Access Management
  'okta-certified-professional': 'Okta Certified Professional',
  'okta-certified-administrator': 'Okta Certified Administrator',
  'okta-certified-consultant': 'Okta Certified Consultant',
  'forgerock-identity-management': 'ForgeRock Identity Management Specialist',
  'certified-identity-professional': 'Certified Identity Professional (CIDPRO)',
  
  // DevOps & Platform Engineering
  'docker-certified-associate': 'Docker Certified Associate (DCA)',
  'kubernetes-administrator': 'Certified Kubernetes Administrator (CKA)',
  'terraform-associate': 'HashiCorp Certified: Terraform Associate',
  'gitlab-certified-associate': 'GitLab Certified Associate',
  'hashicorp-certified-terraform-associate': 'HashiCorp Certified: Terraform Associate',
  
  // Vendor-Specific Others
  'salesforce-administrator': 'Salesforce Certified Administrator',
  'salesforce-developer': 'Salesforce Certified Platform Developer',
  'vmware-vcp': 'VMware Certified Professional (VCP)',
  'servicenow-admin': 'ServiceNow Certified System Administrator',
  'oracle-certified-associate': 'Oracle Certified Associate (OCA)',
  'oracle-certified-professional': 'Oracle Certified Professional (OCP)'
};

export interface Certification {
  id: string;
  name: string;
  category: string;
  source?: string;
  description?: string;
}

export const certificationCategories = {
  'Cybersecurity': [
    'comptia-security-plus', 'cissp', 'cism', 'cisa', 'ceh', 'cysa-plus', 
    'pentest-plus', 'casp-plus', 'gsec', 'sscp', 'ccsp', 'oscp'
  ],
  'Cloud Computing': [
    'aws-solutions-architect', 'aws-certified-developer', 'aws-certified-cloud-practitioner',
    'aws-sysops-administrator', 'aws-devops-engineer', 'google-cloud-professional-architect',
    'google-cloud-associate-engineer', 'google-cloud-professional-data-engineer',
    'microsoft-azure-fundamentals', 'microsoft-azure-administrator',
    'microsoft-azure-solutions-architect', 'microsoft-azure-data-scientist',
    'microsoft-azure-developer'
  ],
  'Networking': [
    'cisco-ccna', 'cisco-ccnp', 'comptia-network-plus', 'jncia-junos',
    'acma', 'ccnp-enterprise', 'ccie', 'comptia-cloud-plus', 'juniper-jncis'
  ],
  'Systems & IT Fundamentals': [
    'comptia-a-plus', 'comptia-linux-plus', 'rhcsa', 'rhce', 'lpic-1', 'mcsa', 'mcse'
  ],
  'Data & Analytics': [
    'certified-data-professional', 'azure-data-scientist-associate', 
    'sas-certified-data-scientist', 'ibm-data-science-professional',
    'cloudera-certified-data-analyst', 'tableau-desktop-specialist',
    'databricks-lakehouse-fundamentals', 'azure-data-engineer'
  ],
  'Project Management': [
    'pmp', 'csm', 'capm', 'prince2-foundation', 'prince2-practitioner',
    'pmi-acp', 'itil-foundation', 'six-sigma-green-belt', 'six-sigma-black-belt'
  ],
  'Identity & Access Management': [
    'okta-certified-professional', 'okta-certified-administrator', 'okta-certified-consultant',
    'forgerock-identity-management', 'certified-identity-professional'
  ],
  'DevOps & Platform Engineering': [
    'aws-devops-engineer', 'docker-certified-associate', 'kubernetes-administrator',
    'terraform-associate', 'gitlab-certified-associate', 'hashicorp-certified-terraform-associate'
  ],
  'Vendor-Specific': [
    'salesforce-administrator', 'salesforce-developer', 'vmware-vcp',
    'servicenow-admin', 'oracle-certified-associate', 'oracle-certified-professional'
  ]
};

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

