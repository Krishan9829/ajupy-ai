"use client";

import { useEffect, useState } from "react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  
  const fetchCollections = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/collections?select=*&order=id.desc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setCollections(data);
      } else {
        setCollections([]);
        console.error("Invalid data from Supabase:", data);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setCollections([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Collections</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        (Array.isArray(collections) ? collections : []).map((item: any) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))
      )}
    </div>
  );
}