
// Cloud services data
export const CLOUD_SERVICES = {
    aws: [
        { name: 'EC2', icon: '☁️', description: 'Virtual Server', color: '#FF9900' },
        { name: 'S3', icon: '🪣', description: 'Object Storage', color: '#FF9900' },
        { name: 'Lambda', icon: 'λ', description: 'Serverless Function', color: '#FF9900' },
        { name: 'RDS', icon: '🗄️', description: 'Relational Database', color: '#FF9900' },
        { name: 'DynamoDB', icon: '⚡', description: 'NoSQL Database', color: '#FF9900' },
        { name: 'ECS', icon: '📦', description: 'Container Service', color: '#FF9900' },
        { name: 'EKS', icon: '⎈', description: 'Kubernetes Service', color: '#FF9900' },
        { name: 'CloudFront', icon: '🌐', description: 'CDN', color: '#FF9900' },
        { name: 'Route53', icon: '🗺️', description: 'DNS Service', color: '#FF9900' },
        { name: 'VPC', icon: '🔒', description: 'Virtual Network', color: '#FF9900' },
    ],
    azure: [
        { name: 'VM', icon: '💻', description: 'Virtual Machine', color: '#0078D4' },
        { name: 'Blob Storage', icon: '📦', description: 'Object Storage', color: '#0078D4' },
        { name: 'Functions', icon: '⚙️', description: 'Serverless', color: '#0078D4' },
        { name: 'SQL Database', icon: '🗃️', description: 'SQL Database', color: '#0078D4' },
        { name: 'Cosmos DB', icon: '🌐', description: 'NoSQL Database', color: '#0078D4' },
        { name: 'AKS', icon: '⎈', description: 'Kubernetes', color: '#0078D4' },
        { name: 'App Service', icon: '🚀', description: 'Web Apps', color: '#0078D4' },
        { name: 'Storage Queue', icon: '📬', description: 'Message Queue', color: '#0078D4' },
        { name: 'Virtual Network', icon: '🔗', description: 'Networking', color: '#0078D4' },
        { name: 'CDN', icon: '🌍', description: 'Content Delivery', color: '#0078D4' },
    ],
    kubernetes: [
        { name: 'Pod', icon: '🎯', description: 'Container Group', color: '#326CE5' },
        { name: 'Service', icon: '🔄', description: 'Load Balancer', color: '#326CE5' },
        { name: 'Deployment', icon: '🚀', description: 'App Deployment', color: '#326CE5' },
        { name: 'Ingress', icon: '🌐', description: 'HTTP Router', color: '#326CE5' },
        { name: 'ConfigMap', icon: '⚙️', description: 'Configuration', color: '#326CE5' },
        { name: 'Secret', icon: '🔐', description: 'Secure Storage', color: '#326CE5' },
        { name: 'StatefulSet', icon: '💾', description: 'Stateful Apps', color: '#326CE5' },
        { name: 'DaemonSet', icon: '👥', description: 'Node Agents', color: '#326CE5' },
        { name: 'Job', icon: '⏱️', description: 'Batch Task', color: '#326CE5' },
        { name: 'PV', icon: '💿', description: 'Persistent Volume', color: '#326CE5' },
    ]
}
