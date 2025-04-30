import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function EducationalResources() {
  const resources = [
    {
      title: "Understanding Breast Cancer Diagnosis",
      description: "Learn about the diagnostic process, from initial screening to confirmatory tests and staging.",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      tags: ["Diagnosis", "Screening", "Mammography"],
      alt: "Doctor reviewing medical scan with patient"
    },
    {
      title: "Advances in Breast Cancer Treatment",
      description: "Explore the latest treatment options, from targeted therapies to immunotherapy and precision medicine.",
      image: "https://images.unsplash.com/photo-1631815589037-dde702ef75f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      tags: ["Treatment", "Immunotherapy", "Research"],
      alt: "Medical professional analyzing data"
    }
  ];

  return (
    <section id="resources" className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Educational Resources</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Evidence-based information about breast cancer diagnosis and treatment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource, index) => (
          <Card key={index} className="overflow-hidden">
            <img 
              src={resource.image} 
              alt={resource.alt} 
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="bg-blue-100 text-primary-600">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="link" className="text-primary-500 hover:text-primary-700 p-0">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
