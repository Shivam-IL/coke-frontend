"use client";
import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useCMSData } from "@/data";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const PrivacyPolicy: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);

  return (
    <>
      <MobileTempNavBar title={cmsData.privacyPolicy.privacyPolicyHeading} />
      <ScreenWrapper className="px-4 md:mt-0 mt-[-30px]">
        <Header
          title={cmsData.privacyPolicy.privacyPolicyHeading}
          className="md:block hidden mt-[100px]"
        />

        <div className="mb-10">
          {/* Privacy Policy Content */}
          <div className="mt-[2.4rem]">
            <div className="md:text-xl text-xs space-y-6 privacy-policy-content">
              <ReactMarkdown>
                {cmsData.privacyPolicy.privacyPolicyContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default PrivacyPolicy;
