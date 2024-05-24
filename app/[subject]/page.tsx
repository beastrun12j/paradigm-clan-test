"use client";

import { useState, useEffect, CSSProperties } from "react";
import { useEdgeStore } from "../../lib/edgestore";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

type Data = {
  document_name: string;
  file_link: string;
  subject_name: string;
};

interface DownloadButtonProps {
  fileUrl: string;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  fileUrl,
  fileName,
}) => {
  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      style={{ padding: "10px 20px", fontSize: "16px" }}
      className="btn btn-sm btn-accent text-center cursor-pointer"
    >
      View File
    </button>
  );
};

export default function Subject({ params }: { params: { subject: string } }) {
  const [file, setFile] = useState<File | undefined>();
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [canUpload, setCanUpload] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata.role === "admin") {
      setCanUpload(true);
    }
  }, [isLoaded, user]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/postData", {
        params: { subject_name: params.subject },
      });
      const result = response.data;
      console.log("Data fetched successfully:", result);
      setData(result.documents);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/postData", {
          params: { subject_name: params.subject },
        });

        if (response) {
          const result = response.data;
          setData(result.documents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.subject]);

  const handleUploadAndSubmit = async () => {
    if (file) {
      setIsLoading(true);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });

      console.log("File upload response:", res);
      const fileUrl = res.url;

      const response = await axios.post("/api/postData", {
        document_name: file.name,
        file_link: fileUrl,
        subject_name: params.subject,
      });

      const result = await response.data;
      console.log("Form submission response:", result);
      fetchData();
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral pt-7">
      <div className="flex-col justify-center items-center">
        <p className="text-center text-4xl mt-5 capitalize">
          Subject: {params.subject}
        </p>
        {canUpload && (
          <p className="text-center text-xl mt-10">Upload documents here</p>
        )}
        {canUpload && (
          <div className="flex justify-center items-center space-x-6">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs my-5"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />

            {!isLoading ? (
              <button
                onClick={handleUploadAndSubmit}
                className="btn btn-secondary"
              >
                Upload
              </button>
            ) : (
              <div
                className="radial-progress"
                style={
                  {
                    "--value": `${progress}`,
                    "--size": "3rem",
                    "--thickness": "2px",
                  } as CSSProperties
                }
                role="progressbar"
              >
                {progress}%
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mx-5 my-4">
        <h1 className="text-xl my-3">Previously Uploaded Documents:</h1>
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="flex justify-center items-center w-full text-center text-2xl mt-10 mb-10">
              Loading...
            </p>
          ) : (
            <table className="table text-center">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Document Name</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.document_name}</td>
                      <td>
                        <DownloadButton
                          fileUrl={item.file_link}
                          fileName={item.document_name}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <p className="flex justify-center items-center w-full text-center text-2xl mt-10">
                        No documents found!
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
