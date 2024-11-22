import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FaChartLine, FaComments, FaSearch, FaRocket } from 'react-icons/fa';

// import AnimatedSection from "../AnimatedSection";
const Aboutsection = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 second loading time
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!isLoading) {
            const icons = document.querySelectorAll('.icon');
            // Animate icons with a 3D effect
            icons.forEach((icon) => {
                gsap.fromTo(icon,
                    { rotationY: 0, scale: 0.5, opacity: 0 },
                    { rotationY: 360, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
                );
            });
        }
    }, [isLoading]);
    return (
        <section className={`bg-blue-900 min-h-screen py-16`}>
                <h2 className="text-4xl font-semibold text-center mb-8 text-white">About Dinenit</h2>
                <p className="text-lg max-w-3xl mx-auto text-center mb-6 text-white">
                    Dinenit is an open-source monitoring tool for tracking your systems, servers, and applications. Visualize real-time performance metrics, receive alerts, and optimize your infrastructure effortlessly.
                </p>

                <div className="flex justify-center items-center">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="border-8 border-white border-opacity-30 border-t-8 border-t-white rounded-full w-12 h-12 animate-spin"></div> {/* Tailwind CSS loader */}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                            {/* Card 1 */}
                            <div className="box bg-white p-4 rounded-lg shadow-lg text-center max-w-xs mx-auto">
                                <div className="w-full flex justify-center items-center mb-4">
                                    <FaChartLine className="icon text-4xl text-orange-500" />                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-black">Monitoring</h3>
                                <p className="text-lg text-black">Situation perpetual allowance offending as principle satisfied. Improved carriage.</p>
                            </div>

                            {/* Card 2 */}
                            <div className="box bg-white p-4 rounded-lg shadow-lg text-center max-w-xs mx-auto">
                                <div className="w-full flex justify-center items-center mb-4">
                                    <FaComments className="icon text-4xl text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-black">Support Chat</h3>
                                <p className="text-lg text-black">Situation perpetual allowance offending as principle satisfied. Improved carriage.</p>                            </div>

                            {/* Card 3 */}
                            <div className="box bg-white p-4 rounded-lg shadow-lg text-center max-w-xs mx-auto">
                                <div className="w-full flex justify-center items-center mb-4">
                                    <FaSearch className="icon text-4xl text-red-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-black">System Analysis</h3>

                                <p className="text-lg text-black">Situation perpetual allowance offending as principle satisfied. Improved carriage.</p>
                            </div>

                            {/* Card 4 */}
                            <div className="box bg-white p-4 rounded-lg shadow-lg text-center max-w-xs mx-auto">
                                <div className="w-full flex justify-center items-center mb-4">
                                    <FaRocket className="icon text-4xl text-yellow-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-black">First Run</h3>
                                <p className="text-lg text-black">Situation perpetual allowance offending as principle satisfied. Improved carriage.</p>
                            </div>
                        </div>
                    )}
                </div>
        </section>
    );
};

export default Aboutsection;