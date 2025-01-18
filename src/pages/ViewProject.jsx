import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(
          `https://samirjkhadka-profile-backend.onrender.com/api/v1/projects/getSingleProject/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setTechnologies(res.data.project.technologies);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setGitRepoLink(res.data.project.githubLink);
          setProjectLink(res.data.project.projectLiveLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };

    getProject();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <img
                  src={projectBanner ? projectBanner : "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Description</p>
                <ul className="list-disc">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm-col-span-4">
                <p className="text-2xl mb-2">Technologies</p>
                <ul className="list-disc">
                  {technologiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Stack:</p>
                <p className="">{stack}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Deployed:</p>
                <p className="">{deployed}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Github Repository Link</p>
                <Link className="text-sky-700" target="_blank">
                  {gitRepoLink}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Project Link</p>
                <Link className="text-sky-700" to={projectLink} target="_blank">
                  {projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
