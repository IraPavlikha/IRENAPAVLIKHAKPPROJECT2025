const LoadingScreen = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="flex flex-col justify-center items-center p-8 rounded-3xl backdrop-blur-sm bg-white/30">
                <div className="w-16 h-16 border-4 border-t-[6px] border-t-purple-500 border-gray-200 rounded-full animate-spin mb-6 shadow-lg">
                </div>
                <span className="text-gray-900 font-serif text-lg tracking-wide">
          Завантаження...
        </span>
            </div>
        </div>
    );
};

export default LoadingScreen;
