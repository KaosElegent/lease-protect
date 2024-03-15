import React from 'react';

interface PreviewFileProps {
  file: File;
  details: string;
  category: string;
  onDelete: () => void;
}

const PreviewFile: React.FC<PreviewFileProps> = ({ file, details, category, onDelete }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="position-relative">
          <div className="overlay bg-dark text-white p-2">
            <p className="mb-0">Category: {category}</p>
            <p className="mb-0">{details}</p>
          </div>
          <button type="button" className="close position-absolute" style={{ top: '5px', right: '5px', zIndex: 1 }} onClick={onDelete}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            {file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="img-thumbnail" />
            ) : (
              <embed src={URL.createObjectURL(file)} type={file.type} width="100%" height="300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFile;
