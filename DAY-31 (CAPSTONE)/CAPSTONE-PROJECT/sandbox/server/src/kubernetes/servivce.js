import { k8sCoreV1Api } from "./config.js";

export async function createService(sandboxId) {
  const serviceName = `sandbox-service-${sandboxId}`;

  const serviceManifest = {
    metadata: {
      name: serviceName,
    },
    spec: {
      selector: {
        app: `sandbox`,
        sandboxId: sandboxId,
      },
      ports: [
        {
          name: "http",
          protocol: "TCP",
          port: 80,
          targetPort: 5173,
        },
      ],
      type: "ClusterIP",
    },
  };

  try {
    const response = await k8sCoreV1Api.createNamespacedService({
      namespace: "default",
      body: serviceManifest,
    });
    console.log(`Service created successfully: ${serviceName}`);
    return response || response?.body?.metadata?.name;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}
