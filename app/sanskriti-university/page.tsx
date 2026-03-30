import SanskritiComponents from "@/components/colleges-components/sanskriti";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Best Private University in Mathura, Uttar Pradesh, India - Sanskriti University",
		description: "Best Private University in Mathura, Uttar Pradesh, India - Sanskriti University",
	};
}

const page = () => {

  return (
    <Suspense fallback={<div className="min-h-screen"/>}>
      <SanskritiComponents/>
    </Suspense>
  );
};

export default page;
