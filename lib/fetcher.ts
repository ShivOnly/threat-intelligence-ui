export const fetchIOCData = async () => {
  return [
    { id: 1, type: "IP", value: "192.168.1.1", severity: "High", date: "2025-09-01" },
    { id: 2, type: "Domain", value: "malicious.com", severity: "Medium", date: "2025-09-02" },
    { id: 3, type: "Hash", value: "abcdef123456", severity: "Critical", date: "2025-09-03" },
    { id: 4, type: "IP", value: "10.0.0.5", severity: "Low", date: "2025-09-04" },
    { id: 5, type: "Domain", value: "phishing.net", severity: "High", date: "2025-09-05" },
    { id: 6, type: "IP", value: "172.16.0.1", severity: "High", date: "2025-09-06" },
    { id: 7, type: "Domain", value: "badsite.org", severity: "Medium", date: "2025-09-06" },
    { id: 8, type: "Hash", value: "123xyz789", severity: "Critical", date: "2025-09-07" },
    
  { id: 9,"value": "1.2.3.4", "type": "ip", "source": "blocklist.de", "severity": "Critical", "timestamp": "2025-08-30T12:00:00Z" },
  { "value": "5.6.7.8", "type": "ip", "source": "blocklist.de", "severity": "High", "timestamp": "2025-08-30T12:05:00Z" },
  { "value": "9.10.11.12", "type": "ip", "source": "blocklist.de", "severity": "Medium", "timestamp": "2025-08-30T12:10:00Z" },
  { "value": "13.14.15.16", "type": "ip", "source": "blocklist.de", "severity": "Low", "timestamp": "2025-08-30T12:15:00Z" },
  { "value": "17.18.19.20", "type": "ip", "source": "blocklist.de", "severity": "Critical", "timestamp": "2025-05-30T12:20:00Z" } 
,  { "value": "8.6.11.12", "type": "ip", "source": "blocklist.de", "severity": "Medium", "timestamp": "2025-04-30T12:10:00Z" },
  { "value": "40.4.15.16", "type": "ip", "source": "blocklist.de", "severity": "Low", "timestamp": "2025-03-30T12:15:00Z" },
  { "value": "3.19.20", "type": "ip", "source": "blocklist.de", "severity": "Critical", "timestamp": "2025-05-30T12:20:00Z" },

  { "value": "192.168.0.0/24", "type": "subnet", "source": "spamhaus", "severity": "Critical", "timestamp": "2025-08-30T12:00:00Z" },
  { "value": "10.0.0.0/16", "type": "subnet", "source": "spamhaus", "severity": "High", "timestamp": "2025-08-30T12:05:00Z" },
  { "value": "172.16.0.0/12", "type": "subnet", "source": "spamhaus", "severity": "Medium", "timestamp": "2025-08-30T12:10:00Z" },
  { "value": "192.168.100.0/24", "type": "subnet", "source": "spamhaus", "severity": "Low", "timestamp": "2025-05-30T12:15:00Z" },
  { "value": "10.1.0.0/16", "type": "subnet", "source": "spamhaus", "severity": "High", "timestamp": "2025-05-30T12:20:00Z" },
  { "value": "172.11.0.0/12", "type": "subnet", "source": "spamhaus", "severity": "Medium", "timestamp": "2025-04-30T12:10:00Z" },
  { "value": "162.1.100.0/24", "type": "subnet", "source": "spamhaus", "severity": "Low", "timestamp": "2025-03-30T12:15:00Z" },
  { "value": "16.1.0.0/16", "type": "subnet", "source": "spamhaus", "severity": "High", "timestamp": "2025-05-30T12:20:00Z" },

  { "value": "http://malicious-site.com/virus.exe", "type": "url", "source": "digitalside", "severity": "Critical", "timestamp": "2025-04-30T12:00:00Z" },
  { "value": "http://badsite.com/malware", "type": "url", "source": "digitalside", "severity": "High", "timestamp": "2025-04-30T12:05:00Z" },
  { "value": "http://evil.com/phishing", "type": "url", "source": "digitalside", "severity": "Medium", "timestamp": "2025-04-30T12:10:00Z" },
  { "value": "http://danger.com/attack", "type": "url", "source": "digitalside", "severity": "Low", "timestamp": "2025-03-30T12:15:00Z" },
  { "value": "http://malware-site.com/download", "type": "url", "source": "digitalside", "severity": "Critical", "timestamp": "2025-04-30T12:20:00Z" }
  ,{ "value": "http://hackintosh.com/throw", "type": "url", "source": "digitalside", "severity": "Medium", "timestamp": "2025-04-30T12:10:00Z" },
  { "value": "http://phising.com/loiter", "type": "url", "source": "digitalside", "severity": "Low", "timestamp": "2025-03-30T12:15:00Z" },
  { "value": "http://scamware-site.com/open", "type": "url", "source": "digitalside", "severity": "Critical", "timestamp": "2025-03-30T12:20:00Z" }
];
};

export const fetchSummaryData = async () => {
  return {
    totalIOCs: 8,
    highSeverity: 3,
    mediumSeverity: 2,
    lowSeverity: 1,
    criticalSeverity: 2,
  };
};
