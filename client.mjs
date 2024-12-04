import fetch from 'node-fetch';

async function callRPCMethod(method, params) {
  const response = await fetch("http://localhost:4000/rpc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.result;
}

(async () => {
  try {
    const response = await callRPCMethod("sayHello", { name: "Mundo" });
    console.log("Respuesta del servidor:", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
