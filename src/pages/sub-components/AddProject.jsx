import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerReview, setProjectBannerReview] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectLiveLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProjectBanner(file);
      setProjectBannerReview(reader.result);
    };
  };
  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleAddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectBanner", projectBanner);
    formData.append("githubLink", githubLink);
    formData.append("projectLiveLink", projectLiveLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [error, message, loading, dispatch]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        action=""
        onSubmit={handleAddNewProject}
        className="w-[100%] px-5 md:w-[1000px]"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              Add New Project
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="MERN Stack"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="">
                  <div className="">
                    <Textarea
                      placeholder="Feature Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Technologies used
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="HTML, CSS, JS, REACT"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stack
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FullStack">Full Stack</SelectItem>
                        <SelectItem value="MERN">MERN</SelectItem>
                        <SelectItem value="MEAN">MEAN</SelectItem>
                        <SelectItem value="NEXTJS">NEXT JS</SelectItem>
                        <SelectItem value="REACTJS">REACT JS</SelectItem>
                        <SelectItem value="REACTNATIVE">
                          REACT NATIVE
                        </SelectItem>
                        <SelectItem value="C#_ASP.NET">C# ASP.NET</SelectItem>
                        <SelectItem value="SQLSERVER">SQL SERVER</SelectItem>
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
                  Deployed
                </label>
                <div className="mt-2">
                  <div className="">
                    <Select
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setDeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Is Deployed ?" />
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
                  Github Repository Link
                </label>
                <div className="mt-2">
                  <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}/>
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
                  <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Project Link"
                      value={projectLiveLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-full">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Banner
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {projectBanner ? (
                      <img
                        src={projectBanner && `${projectBannerReview}`}
                        alt="projectBanner"
                        className="mx-auto h-[250px] w-full text-gray-300"
                        viewBox="0 0 24 24"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span className="">Upload a File</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSvg}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoadingButton
              content={"Adding New Project"}
              width={"w-56"}
            />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56"
            >
              Add project
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProject;
