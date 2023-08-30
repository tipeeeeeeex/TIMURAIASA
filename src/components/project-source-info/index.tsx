import React, { useMemo } from 'react';
import { Image, Typography } from '@douyinfe/semi-ui';
import AIOSLOGO from '@/assets/img/TIMUR-AI.png';

const { Text } = Typography;

const LOGO = import.meta.env.VITE_LOGO_URL;
const INFO = import.meta.env.VITE_INFO;

const ProjectSourceInfo: React.FC = function ProjectSourceInfo() {
  const info = useMemo(() => {
    if (INFO) return INFO;
    return (
      <>
      FOUNDED / DEVELOPED BY TIMUR
      </>
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full pb-32">
      <Image preview={false} height="200" width="200" src={LOGO || AIOSLOGO} />
      <Typography className="font-medium m-8 text-xl">
        {info}        
      </Typography>
    </div>
  );
};

export default ProjectSourceInfo;
