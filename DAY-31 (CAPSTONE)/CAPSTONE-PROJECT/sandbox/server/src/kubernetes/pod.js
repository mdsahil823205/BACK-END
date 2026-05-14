import { k8sCoreV1Api } from "./config.js"

export async function createPods(sandboxId) {
    const podName = `sandbox-pod-${sandboxId}`;
    const podManifest = {
        metadata: {
            name: podName,
            labels: {
                app: "sandbox",
                sandboxId: sandboxId
            }
        },
        spec: {
            containers: [
                {
                    name: "sandbox-container",
                    image: "template:latest",
                    imagePullPolicy: "IfNotPresent",
                    ports: [{ name: "http", containerPort: 5173 }],
                    resources: {
                        limits: { memory: "256Mi", cpu: "512m" },
                        requests: { memory: "128Mi", cpu: "256m" }
                    }
                }
            ]
        }
    };

    try {
        const response = await k8sCoreV1Api.createNamespacedPod({
            namespace: "default",
            body: podManifest
        });
        console.log("pod created successfully", podName);
        return response || response?.body?.metadata?.name;
    } catch (error) {
        console.error("error in creating pod", error?.body?.message || error.message || error)
        throw error;
    }
}