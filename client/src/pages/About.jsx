import { Link } from "react-router";
import { useSelector } from "react-redux";

export const About = () => {
  const { user } = useSelector((state) => state.auth);

  return (
      <div className="min-h-screen bg-white text-[#0A0A0A] font-serif leading-relaxed">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-[72px] font-sans font-[900] mb-12">
            About This Project
          </h1>

          <div className="space-y-12">
            <p className="text-[18px] max-w-3xl">
              Welcome to our Online Auction System - a comprehensive web application designed to facilitate online bidding and auctions.
            </p>

            <section className="space-y-4">
              <h2 className="text-[28px] font-sans font-[900] text-[#8B5CF6]">
                Project Purpose
              </h2>
              <p className="max-w-3xl">
                This project has been developed as an educational resource for students pursuing their final year or third year minor/major projects. It serves as a practical example of building a full-featured web application with modern technologies and best practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[28px] font-sans font-[900] text-[#8B5CF6]">
                For Students
              </h2>
              <p className="max-w-3xl">
                If you're a computer science or related field student working on your academic project, you can use this codebase to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Understand modern web development patterns and practices</li>
                <li>Learn how to implement real-time bidding systems</li>
                <li>Study user authentication and authorization</li>
                <li>Explore database design for auction systems</li>
                <li>Learn about responsive design and user experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-[28px] font-sans font-[900] text-[#8B5CF6]">
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2 max-w-3xl">
                <li>User registration and authentication</li>
                <li>Real-time auction bidding</li>
                <li>Item listing and management</li>
                <li>User profile management</li>
                <li>Responsive design for all devices</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-[28px] font-sans font-[900] text-[#8B5CF6]">
                Developer
              </h2>
              <p>
                This project has been created by <strong>Avnish Kumar</strong> as a demonstration of modern web development techniques and to help fellow students in their academic journey.
              </p>

              <div className="mt-4 p-6 bg-[#F5F0E8] rounded-xl shadow-sm">
                <p className="font-medium mb-2">Connect with the Developer:</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">GitHub Profile:</span>{" "}
                    <a href="https://github.com/theavnishkumar" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:text-[#5B21B6] underline">
                      github.com/theavnishkumar
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Project Repository:</span>{" "}
                    <a href="https://github.com/theavnishkumar/online-auction-system" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:text-[#5B21B6] underline">
                      github.com/theavnishkumar/online-auction-system
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-[28px] font-sans font-[900] text-[#8B5CF6]">
                Getting Started
              </h2>
              <p className="max-w-3xl">
                To get started with this project, visit the GitHub repository where you'll find detailed installation instructions, documentation, and code explanations. The repository includes everything you need to set up and run the application locally.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[28px] font-sans font-[900] text-[#8B5CF6]">
                Academic Use
              </h2>
              <p className="max-w-3xl">
                Students are encouraged to study this codebase, understand the implementation, and adapt it for their own projects. Please ensure you follow your institution's guidelines regarding code usage and attribution in academic work.
              </p>
            </section>

            <div className="mt-16 pt-12 border-t border-[#FFE5D9] text-center">
              <p>
                Have questions or need support? Feel free to{" "}
                <Link to="/contact" className="text-[#8B5CF6] hover:text-[#5B21B6] underline font-medium">
                  contact us
                </Link>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};
