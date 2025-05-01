import { useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { 
  Clock, 
  Bookmark, 
  Share2, 
  ArrowRight, 
  Tag, 
  User,
  Heart,
  Microscope,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/BackButton";

// Blog article interface
interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: number;
}

// Sample breast cancer related articles
const breastCancerArticles: BlogArticle[] = [
  {
    id: "early-detection",
    title: "Advanced Neural Networks in Early Cancer Detection",
    excerpt: "How AI-powered diagnostics are revolutionizing early detection of breast cancer through cellular pattern recognition and real-time analysis.",
    content: `
      <h2>Neural Networks in Breast Cancer Detection</h2>
      
      <p>Artificial intelligence, particularly deep learning neural networks, has made significant advancements in the medical field, especially in breast cancer detection. Early detection of breast cancer is crucial for successful treatment and improved patient outcomes. Traditional screening methods such as mammography, while effective, can sometimes miss subtle indicators that AI systems can detect.</p>
      
      <h3>How Neural Networks Analyze Medical Images</h3>
      
      <p>Advanced convolutional neural networks (CNNs) can analyze mammograms, ultrasound images, and MRIs with remarkable precision. These systems are trained on thousands of medical images, learning to recognize patterns and abnormalities that might indicate cancer. The networks can identify subtle changes in tissue density, microclassifications, and architectural distortions that human radiologists might miss.</p>
      
      <p>In a recent study published in the Journal of Medical Imaging, AI systems demonstrated a 97.8% accuracy rate in detecting early-stage breast cancer from mammogram images, compared to the 85-90% accuracy typically achieved by experienced radiologists.</p>
      
      <h3>Real-Time Processing Capabilities</h3>
      
      <p>One of the most significant advantages of neural network systems is their ability to process medical images in real-time. This capability allows for immediate feedback during screening procedures, potentially reducing the need for follow-up appointments and decreasing patient anxiety.</p>
      
      <p>Quantum computing advances are further enhancing these capabilities, allowing for more complex neural network architectures that can analyze three-dimensional imaging data with unprecedented speed and accuracy.</p>
      
      <h3>Future Directions</h3>
      
      <p>Research is now focusing on integrating multiple data sources for more holistic AI analysis. By combining imaging data with genetic information, patient history, and environmental factors, neural networks may soon provide even more accurate risk assessments and personalized screening recommendations.</p>
      
      <p>As these technologies continue to evolve, they promise to dramatically improve breast cancer detection rates while reducing false positives and unnecessary biopsies. The future of cancer diagnostics lies in these intelligent systems that augment human expertise with computational precision.</p>
    `,
    author: "Dr. Emily Watson",
    date: "April 25, 2025",
    category: "AI in Medicine",
    tags: ["neural networks", "early detection", "diagnostic AI", "medical imaging"],
    imageUrl: "https://images.unsplash.com/photo-1576670759896-063254ba3c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: 8
  },
  {
    id: "treatment-innovations",
    title: "Recent Innovations in Breast Cancer Treatment Protocols",
    excerpt: "Exploring the latest therapeutic approaches that are significantly improving patient outcomes and quality of life during treatment.",
    content: `
      <h2>Breakthrough Treatments in Breast Cancer Care</h2>
      
      <p>The landscape of breast cancer treatment has transformed dramatically in recent years, with personalized medicine leading the charge. Gone are the days of one-size-fits-all approaches as oncologists now tailor treatments to the specific genetic and molecular characteristics of each patient's cancer.</p>
      
      <h3>Targeted Immunotherapy Approaches</h3>
      
      <p>Immunotherapy has emerged as one of the most promising treatment modalities for certain types of breast cancer. By leveraging the body's own immune system to recognize and attack cancer cells, these treatments can be highly effective while causing fewer side effects than traditional chemotherapy.</p>
      
      <p>Recent clinical trials have shown remarkable results for triple-negative breast cancer, historically one of the most challenging subtypes to treat. The FDA-approved immunotherapy drug atezolizumab, when combined with chemotherapy, has demonstrated significantly improved survival rates in patients with metastatic disease.</p>
      
      <h3>Precision Medicine and Genetic Profiling</h3>
      
      <p>Advances in genetic sequencing technologies have enabled oncologists to identify specific mutations driving cancer growth. This information allows for highly targeted treatments that address the underlying molecular mechanisms of the disease.</p>
      
      <p>For example, PARP inhibitors have shown significant effectiveness in patients with BRCA mutations. These drugs work by preventing cancer cells from repairing their DNA, ultimately leading to cell death. For patients with these specific genetic profiles, such targeted approaches can be far more effective than conventional treatments.</p>
      
      <h3>Minimally Invasive Surgical Techniques</h3>
      
      <p>Surgical interventions have also evolved substantially. Oncoplastic surgery combines cancer removal with immediate reconstructive techniques, preserving natural anatomy while effectively removing cancerous tissue. Robot-assisted surgeries offer greater precision and smaller incisions, reducing recovery time and improving cosmetic outcomes.</p>
      
      <h3>Looking Forward</h3>
      
      <p>The integration of artificial intelligence in treatment planning represents the next frontier. AI systems can analyze vast amounts of patient data to predict treatment responses and suggest optimal therapy combinations. This approach promises to further refine the personalization of cancer care, ensuring each patient receives the most effective treatment with minimal adverse effects.</p>
    `,
    author: "Dr. Robert Chen",
    date: "April 18, 2025",
    category: "Treatment",
    tags: ["immunotherapy", "precision medicine", "surgical advances", "treatment protocols"],
    imageUrl: "https://images.unsplash.com/photo-1631563019676-dfa7771ba0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: 10
  },
  {
    id: "genetic-factors",
    title: "Understanding the Genetic Factors in Breast Cancer Risk Assessment",
    excerpt: "A deep dive into how genetic markers and family history contribute to comprehensive risk profiles and preventative strategies.",
    content: `
      <h2>The Genetic Landscape of Breast Cancer</h2>
      
      <p>Genetic factors play a crucial role in breast cancer development, with hereditary mutations accounting for approximately 5-10% of all cases. Understanding these genetic components has revolutionized how we approach risk assessment, prevention strategies, and treatment protocols.</p>
      
      <h3>Beyond BRCA: The Expanding Genetic Risk Profile</h3>
      
      <p>While BRCA1 and BRCA2 gene mutations are well-known risk factors, scientists have identified dozens of additional genes that may contribute to breast cancer susceptibility. Mutations in genes such as PALB2, CHEK2, ATM, and TP53 have been linked to increased risk, though often with lower penetrance than BRCA mutations.</p>
      
      <p>Multi-gene panel testing now allows for comprehensive screening of these genetic factors, providing a more complete risk assessment than was previously possible. This expanded testing capability has particular importance for families with strong cancer histories that don't demonstrate the classical BRCA mutation patterns.</p>
      
      <h3>Polygenic Risk Scores</h3>
      
      <p>Beyond single-gene mutations, researchers have developed polygenic risk scores (PRS) that analyze multiple common genetic variants (SNPs) to assess cumulative risk. These scores can identify individuals at elevated risk even in the absence of known high-penetrance mutations.</p>
      
      <p>A 2024 study in Nature Genetics demonstrated that combining PRS with traditional risk factors significantly improved risk prediction accuracy, particularly for women without family histories of breast cancer.</p>
      
      <h3>Epigenetic Factors and Gene Expression</h3>
      
      <p>The field of epigenetics examines how environmental factors influence gene expression without altering the underlying DNA sequence. Patterns of DNA methylation, histone modifications, and microRNA regulation can significantly impact cancer risk and progression.</p>
      
      <p>New blood tests that analyze these epigenetic markers offer promising avenues for non-invasive screening and monitoring, potentially detecting cancer signals before conventional imaging can identify tumors.</p>
      
      <h3>Personalized Prevention Strategies</h3>
      
      <p>The ultimate goal of genetic risk assessment is personalized prevention. For high-risk individuals, options may include enhanced surveillance, chemoprevention with medications like tamoxifen, or risk-reducing surgeries. The appropriate approach depends on the specific genetic factors identified, other personal risk factors, and individual preferences.</p>
      
      <p>Artificial intelligence is increasingly being employed to analyze these complex datasets and generate tailored prevention recommendations that balance risk reduction with quality of life considerations.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "April 10, 2025",
    category: "Genetics",
    tags: ["genetic testing", "BRCA", "hereditary cancer", "risk assessment"],
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: 12
  },
  {
    id: "ai-diagnosis",
    title: "AI-Powered Diagnostic Accuracy: A New Era in Medical Imaging",
    excerpt: "How machine learning algorithms are increasing diagnostic accuracy and reducing false positives in breast cancer screening.",
    content: `
      <h2>Artificial Intelligence Revolutionizing Breast Cancer Diagnostics</h2>
      
      <p>The integration of artificial intelligence into medical imaging has marked a paradigm shift in how breast cancer is detected and diagnosed. These sophisticated systems are enhancing diagnostic accuracy while simultaneously addressing longstanding challenges in traditional screening methods.</p>
      
      <h3>Reducing False Positives</h3>
      
      <p>One of the most significant contributions of AI in breast cancer screening has been the reduction of false positive results. Traditional mammography has a false positive rate of approximately 10%, leading to unnecessary anxiety, additional testing, and invasive procedures for many women.</p>
      
      <p>Advanced AI algorithms can now distinguish between benign abnormalities and potentially cancerous lesions with remarkable precision. A 2025 multi-center study published in Radiology demonstrated that AI-assisted interpretation reduced false positives by 37% while maintaining sensitivity for detecting actual cancers.</p>
      
      <h3>Addressing Dense Breast Tissue Challenges</h3>
      
      <p>Dense breast tissue has long presented a challenge for conventional mammography, as both dense tissue and tumors appear white on mammograms. This similarity makes cancer detection particularly difficult in women with dense breasts.</p>
      
      <p>AI systems can detect subtle patterns and variations invisible to the human eye, significantly improving cancer detection in dense breast tissue. When combined with digital breast tomosynthesis (3D mammography), AI detection rates in women with dense breasts approach those achieved in women with fatty breast tissue.</p>
      
      <h3>Workload Optimization and Radiologist Support</h3>
      
      <p>Rather than replacing radiologists, AI systems most effectively serve as sophisticated support tools. By pre-screening images and flagging potential abnormalities, these systems allow radiologists to focus their expertise on the most challenging cases.</p>
      
      <p>This collaborative approach between human expertise and computational analysis optimizes workflow efficiency while improving diagnostic accuracy. Early studies suggest that this human-AI partnership can reduce reading time by up to 30% while improving overall detection rates.</p>
      
      <h3>Future Integration with Multi-Modal Imaging</h3>
      
      <p>The next frontier in AI diagnostics involves integrating information from multiple imaging modalities, including mammography, ultrasound, MRI, and molecular breast imaging. By synthesizing data from these complementary techniques, AI systems can provide a more comprehensive assessment than any single imaging method.</p>
      
      <p>This holistic approach promises to further improve detection rates while reducing unnecessary procedures, ultimately advancing the goal of precise, personalized breast cancer screening.</p>
    `,
    author: "Dr. Michael Zhang",
    date: "April 5, 2025",
    category: "Diagnostic Technology",
    tags: ["artificial intelligence", "medical imaging", "mammography", "diagnostic accuracy"],
    imageUrl: "https://images.unsplash.com/photo-1486825586573-7131f7991bdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: 9
  },
  {
    id: "patient-resources",
    title: "Essential Resources for Breast Cancer Patients Navigating Treatment",
    excerpt: "A comprehensive guide to support networks, digital tools, and educational resources available for patients throughout their treatment journey.",
    content: `
      <h2>Navigating the Breast Cancer Journey: Essential Resources</h2>
      
      <p>A breast cancer diagnosis can be overwhelming, but numerous resources exist to support patients throughout their treatment journey. From digital health tools to support communities, these resources can provide crucial information, emotional support, and practical assistance.</p>
      
      <h3>Digital Health Platforms</h3>
      
      <p>Modern healthcare apps designed specifically for cancer patients can help track symptoms, manage medications, coordinate appointments, and store medical records. Platforms like CancerAid, Cancer.Net Mobile, and LivingWith provide comprehensive tools that empower patients to actively participate in their care.</p>
      
      <p>Telemedicine services have also expanded access to specialists regardless of geographic location. Virtual second opinion services allow patients to consult with leading oncologists at major cancer centers without the need for travel.</p>
      
      <h3>Patient Navigation Programs</h3>
      
      <p>Many hospitals and cancer centers now offer patient navigation programs where dedicated professionals help guide patients through the complex healthcare system. These navigators can assist with appointment scheduling, insurance questions, transportation arrangements, and connecting patients with appropriate support services.</p>
      
      <p>The Academy of Oncology Nurse & Patient Navigators (AONN+) provides a searchable database to help patients locate navigation programs in their area.</p>
      
      <h3>Support Communities and Peer Mentoring</h3>
      
      <p>Connecting with others who understand the breast cancer experience can be invaluable. Organizations like SHARE, Living Beyond Breast Cancer, and the Young Survival Coalition offer peer mentoring programs that match newly diagnosed patients with survivors who have had similar experiences.</p>
      
      <p>Online communities such as Breastcancer.org's discussion forums and the American Cancer Society's Cancer Survivors Network provide 24/7 support and information exchange in a safe, moderated environment.</p>
      
      <h3>Financial Resource Programs</h3>
      
      <p>The financial burden of cancer treatment can be substantial. Programs like CancerCare, the Patient Advocate Foundation, and the Pink Fund provide financial assistance for treatment costs, transportation, childcare, and living expenses during treatment.</p>
      
      <p>Many pharmaceutical companies also offer patient assistance programs that help cover the cost of medications for those who qualify based on financial need.</p>
      
      <h3>Integrative Medicine Resources</h3>
      
      <p>Complementary approaches such as nutrition counseling, mind-body practices, and exercise programs can help manage treatment side effects and improve quality of life. Organizations like the Society for Integrative Oncology provide evidence-based information about complementary therapies that can be safely integrated with conventional treatment.</p>
      
      <p>Many cancer centers now offer integrative medicine departments that provide these services in coordination with standard medical care.</p>
    `,
    author: "Lisa Martinez, MSN",
    date: "March 28, 2025",
    category: "Patient Support",
    tags: ["patient resources", "support networks", "digital health", "cancer navigation"],
    imageUrl: "https://images.unsplash.com/photo-1469571486292-b5f920fa80bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: 7
  }
];

// Blog Home component
function BlogHome() {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredArticles = filter 
    ? breastCancerArticles.filter(article => 
        article.category === filter || article.tags.includes(filter)
      )
    : breastCancerArticles;
    
  // Available categories and tags for filtering
  const categories = Array.from(new Set(breastCancerArticles.map(a => a.category)));
  const tags = Array.from(new Set(breastCancerArticles.flatMap(a => a.tags)));
  
  return (
    <div className="relative py-10 sm:py-16 md:py-20 overflow-hidden bg-gray-950 min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px] -top-40 -left-20"></div>
        <div className="absolute w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-secondary/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] -bottom-40 -right-20"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <div className="mb-4 sm:mb-6">
          <BackButton to="/" label="Back to Home" variant="outline" className="bg-black/30 text-white hover:bg-black/50 border-white/10" />
        </div>
        
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center mb-3 sm:mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
            <span className="text-xs sm:text-sm font-medium">Research & Education</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
            Medical Knowledge Repository
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Explore the latest research, treatment innovations, and medical insights related to breast cancer diagnosis and care.
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-6 sm:mb-8 md:mb-12 flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          <Button
            variant={filter === null ? "default" : "outline"}
            className={`rounded-full text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto ${filter === null ? 'bg-primary' : 'bg-gray-800/50 border-white/10 text-gray-300'}`}
            onClick={() => setFilter(null)}
          >
            All Articles
          </Button>
          
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              className={`rounded-full text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto ${filter === category ? 'bg-primary' : 'bg-gray-800/50 border-white/10 text-gray-300'}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
          
          {tags.slice(0, 5).map(tag => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              className={`rounded-full text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto ${filter === tag ? 'bg-primary' : 'bg-gray-800/50 border-white/10 text-gray-300'}`}
              onClick={() => setFilter(tag)}
            >
              <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
              {tag}
            </Button>
          ))}
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredArticles.map(article => (
            <div 
              key={article.id} 
              className="card-holographic backdrop-blur-md bg-black/30 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              <div className="h-40 sm:h-44 md:h-48 overflow-hidden relative">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-primary/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 sm:py-1 rounded-full">
                  {article.category}
                </div>
              </div>
              
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center text-xs text-gray-400 mb-2 sm:mb-3">
                  <User className="h-3 w-3 mr-1" />
                  <span className="text-xs">{article.author}</span>
                  <span className="mx-1 sm:mx-2">•</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">{article.readTime} min read</span>
                </div>
                
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex justify-between items-center mt-3 sm:mt-4">
                  <Link href={`/blog/${article.id}`}>
                    <Button className="btn-futuristic text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto">
                      Read Article <ArrowRight className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </Button>
                  </Link>
                  
                  <div className="flex gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50">
                      <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Article detail component
function ArticleDetail({ articleId }: { articleId: string }) {
  const article = breastCancerArticles.find(a => a.id === articleId);
  const [, setLocation] = useLocation();
  
  if (!article) {
    return <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">Article not found</h2>
      <Button onClick={() => setLocation("/blog")} className="btn-futuristic">
        Return to Blog
      </Button>
    </div>;
  }
  
  // Get related articles (same category or shared tags)
  const relatedArticles = breastCancerArticles
    .filter(a => a.id !== articleId && 
      (a.category === article.category || 
       a.tags.some(tag => article.tags.includes(tag))))
    .slice(0, 3);
  
  return (
    <div className="relative py-16 overflow-hidden bg-gray-950 min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -top-40 -left-20"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] -bottom-40 -right-20"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="mb-4 sm:mb-6">
          <BackButton to="/blog" label="Back to Blog" variant="outline" className="bg-black/30 text-white hover:bg-black/50 border-white/10" />
        </div>
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center text-gray-400 text-sm">
          <Button 
            variant="link" 
            className="text-gray-400 hover:text-primary p-0 h-auto font-normal"
            onClick={() => setLocation("/blog")}
          >
            Blog
          </Button>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{article.category}</span>
          <span className="mx-2">/</span>
          <span className="text-primary truncate max-w-[200px]">{article.title}</span>
        </div>
        
        {/* Article Header */}
        <div className="mb-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-400 mb-8 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span>{article.author}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span>{article.date}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden mb-10">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            <div className="card-holographic backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-8">
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-accent prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Button
                  key={tag}
                  variant="outline"
                  className="rounded-full bg-gray-800/50 border-white/10 text-gray-300 hover:bg-gray-700"
                  size="sm"
                  onClick={() => {
                    setLocation("/blog");
                    // We would ideally set the filter here, but need to pass state between components
                  }}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
            
            {/* Share Buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Share this article:</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-blue-600/50">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-blue-800/50">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-blue-500/50">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-red-500/50">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author */}
            <div className="card-holographic backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <User className="h-4 w-4 mr-2 text-primary" /> About the Author
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3 text-primary font-bold text-lg">
                  {article.author.split(' ')[0][0]}{article.author.split(' ')[1][0]}
                </div>
                <div>
                  <div className="text-white font-medium">{article.author}</div>
                  <div className="text-gray-400 text-sm">Medical Researcher</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Specialized in advanced diagnostic techniques and AI applications in oncology, with over 15 years of clinical research experience.
              </p>
            </div>
            
            {/* Related Articles */}
            <div className="card-holographic backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-primary" /> Related Articles
              </h3>
              <div className="space-y-4">
                {relatedArticles.map(relatedArticle => (
                  <div key={relatedArticle.id} className="group">
                    <Link href={`/blog/${relatedArticle.id}`}>
                      <div className="flex gap-3 group-hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={relatedArticle.imageUrl} 
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{relatedArticle.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button
                  className="w-full btn-futuristic"
                  onClick={() => setLocation("/blog")}
                >
                  View All Articles
                </Button>
              </div>
            </div>
            
            {/* Categories */}
            <div className="card-holographic backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <Tag className="h-4 w-4 mr-2 text-primary" /> Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(breastCancerArticles.map(a => a.category))).map(category => (
                  <Button
                    key={category}
                    variant="outline"
                    className="rounded-full bg-gray-800/50 border-white/10 text-gray-300 hover:bg-primary/20 hover:border-primary/30"
                    size="sm"
                    onClick={() => {
                      setLocation("/blog");
                      // We would ideally set the filter here
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Blog Component
export default function Blog() {
  const [match, params] = useRoute("/blog/:articleId");
  
  if (match && params?.articleId) {
    return <ArticleDetail articleId={params.articleId} />;
  }
  
  return <BlogHome />;
}