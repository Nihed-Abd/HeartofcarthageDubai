import React from 'react';

const DownloadApp = () => {
  return (
    <div className="download-app-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h6 className="section-subtitle">Download Our App</h6>
              <h1 className="section-title">Heart Of Carthage Dubai</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {/* Play Store */}
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="app-download-item text-center">
              <div className="app-download-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/300/300218.png"
                  alt="Play Store"
                />
              </div>
              <div className="app-download-info">
                <h3>Play Store</h3>
                <p>
                  Get our app from the Play Store. Enjoy seamless browsing,
                  quick access, and easy Experience.
                </p>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Download Now
                </a>
              </div>
            </div>
          </div>
          {/* App Store */}
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="app-download-item text-center">
              <div className="app-download-icon">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpVnLROuDMVHVZfmR6TECZ0L8OteTvvDdpw&s"
                  alt="App Store"
                />
              </div>
              <div className="app-download-info">
                <h3>App Store</h3>
                <p>
                  Get our app from the App Store. Experience a sleek and
                  user-friendly interface for property exploration.
                </p>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Download Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .download-app-section {
          padding: 50px 0;
          background-color: #f9f9f9;
        }
        .section-title-area {
          margin-bottom: 30px;
        }
        .section-subtitle {
          color: #133236;
          font-weight: bold;
        }
        .section-title {
          font-size: 28px;
          font-weight: bold;
          margin-top: 10px;
        }
        .app-download-item {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        .app-download-icon img {
          width: 100px;
          height: auto;
          margin-bottom: 15px;
        }
        .app-download-info h3 {
          font-size: 20px;
          font-weight: bold;
          color: #133236;
          margin-bottom: 10px;
        }
        .app-download-info p {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }
        .download-btn {
          display: inline-block;
          padding: 10px 20px;
          color: #fff;
          background-color: #133236;
          border-radius: 5px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .download-btn:hover {
          background-color: #0e2529;
        }
      `}</style>
    </div>
  );
};

export default DownloadApp;
