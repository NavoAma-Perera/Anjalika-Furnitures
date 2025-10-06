'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">
            © {currentYear} Anjalika Furniture. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="text-sm text-gray-600 hover:text-amber-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-amber-600 transition">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-amber-600 transition">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}
