import { useState, useEffect } from "react";
import { CohereClient } from "cohere-ai";

export const useCohereClient = (apiKey) => {
    const [cohereClient, setCohereClient] = useState(null);
  
    useEffect(() => {
      if (apiKey) {
        const cohere = new CohereClient({ token: apiKey });
        setCohereClient(cohere);
      }
    }, [apiKey]);
  
    return cohereClient;
  };