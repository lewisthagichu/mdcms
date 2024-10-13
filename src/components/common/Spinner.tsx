'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

// Define the props interface for the Spinner component
interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClipLoader
        color="#9acd32"
        loading={loading}
        cssOverride={override}
        size={75}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Spinner;
