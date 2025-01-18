import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clearAllProjectErrors,
  getAllProjects,
  updateProject,
} from "@/store/slices/projectSlice";
import axios from "axios";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setechnologies] = useState("");
  const [stack, setstack] = useState("");
  const [githubLink, setgithubLink] = useState("");
  const [projectLiveLink, setprojectLiveLink] = useState("");
  const [deployed, setdeployed] = useState("");
  const [projectBanner, setprojectBanner] = useState("");
  const [projectBannerPreview, setprojectBannerPreview] = useState("");

  const { error, loading, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setprojectBanner(file);
      setprojectBannerPreview(reader.result);
    };
  };

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
          setechnologies(res.data.project.technologies);
          setstack(res.data.project.stack);
          setdeployed(res.data.project.deployed);
          setgithubLink(res.data.project.githubLink);
          setprojectLiveLink(res.data.project.projectLiveLink);
          setprojectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setprojectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
    getProject();

    if (error) {
      toast.error(message);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllProjectErrors());
      dispatch(getAllProjects());
    }
  }, [error, dispatch, message, id]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("githubLink", githubLink);
    formData.append("projectLiveLink", projectLiveLink);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <form
        onSubmit={handleUpdateProject}
        className="w-[100%] px-5 md:w-[1000px] pb-5"
      >
        <div className="">
          <div className="">
            <div className="">
              <h2 className="">Update Project</h2>
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <img
                  src={
                    projectBannerPreview
                      ? projectBannerPreview
                      : "/avatarholder.jpg"
                  }
                  alt="avatar"
                  className="w-full h-auto"
                />
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleProjectBanner}
                    className="avatar-update-btn mt-4 w-full"
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  Project Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Type Your Project Title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="Type Your Project Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Stack
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={stack}
                      onValueChange={(selectedValue) => setstack(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MERN">MERN</SelectItem>
                        <SelectItem value="MERN1">MERN</SelectItem>
                        <SelectItem value="MERN2">MERN</SelectItem>
                        <SelectItem value="MERN3">MERN</SelectItem>
                        <SelectItem value="MERN4">MERN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Deployed
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setdeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Github Respository Link
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Type Your Github Respository Link"
                      value={githubLink}
                      onChange={(e) => setgithubLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Link
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Github Repository Link"
                      value={projectLiveLink}
                      onChange={(e) => setprojectLiveLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoadingButton content={"Updating"} width={"w-25"} />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
