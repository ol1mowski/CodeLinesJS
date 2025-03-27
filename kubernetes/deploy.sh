ENV=${1:-dev}

if [ "$ENV" != "dev" ] && [ "$ENV" != "prod" ]; then
  echo "Error: Environment must be 'dev' or 'prod'"
  echo "Usage: $0 [dev|prod]"
  exit 1
fi

DOCKER_REGISTRY=${DOCKER_REGISTRY:-ol1mowski}

echo "Deploying for environment: $ENV"
echo "Using Docker registry: $DOCKER_REGISTRY"

if ! command -v kubectl &> /dev/null; then
  echo "Error: kubectl is not installed or not available in PATH"
  exit 1
fi

if ! kubectl get nodes &> /dev/null; then
  echo "Error: Cannot connect to Kubernetes cluster. Ensure kubeconfig is configured."
  exit 1
fi

if [ "$ENV" == "dev" ]; then
  NAMESPACE="codelinesjs-dev"
else
  NAMESPACE="codelinesjs"
fi

if ! kubectl get namespace $NAMESPACE &> /dev/null; then
  echo "Creating namespace: $NAMESPACE"
  kubectl create namespace $NAMESPACE
fi

echo "Deploying Kubernetes configuration for environment $ENV..."
kubectl apply -k overlays/$ENV

echo "Checking deployment status..."
if [ "$ENV" == "dev" ]; then
  kubectl rollout status deployment/server-dev -n $NAMESPACE
else
  kubectl rollout status deployment/server -n $NAMESPACE
fi

echo "Deployment completed!"

echo "Getting application access information..."
if [ "$ENV" == "dev" ]; then
  INGRESS_NAME="codelinesjs-ingress-dev"
else
  INGRESS_NAME="codelinesjs-ingress"
fi

INGRESS_IP=$(kubectl get ingress $INGRESS_NAME -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
INGRESS_HOSTNAME=$(kubectl get ingress $INGRESS_NAME -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null)

if [ -n "$INGRESS_IP" ]; then
  echo "API available at IP address: $INGRESS_IP"
elif [ -n "$INGRESS_HOSTNAME" ]; then
  echo "API available at hostname: $INGRESS_HOSTNAME"
else
  echo "API address is not yet available. Check Ingress status using: kubectl get ingress $INGRESS_NAME -n $NAMESPACE"
fi

echo "Pod information:"
kubectl get pods -n $NAMESPACE 