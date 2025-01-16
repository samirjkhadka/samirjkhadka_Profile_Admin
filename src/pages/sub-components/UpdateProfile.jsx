import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [xURL, setxURL] = useState(
    user && (user.xURL === "undefined" ? "" : user.xURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );
  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("xURL", xURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div className="">
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="text-balance text-muted-foreground">
              Update your profile here
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    onChange={avatarHandler}
                    className="avatar-update-btn"
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link
                  to={user && user.resume && user.resume.url}
                  target="_blank"
                >
                  <img
                    src={resumePreview ? resumePreview : "/resumeHolder.jpg"}
                    alt="resume"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>
                <div className="relative">
                  <input
                    type="file"
                    onChange={resumeHandler}
                    className="avatar-update-btn"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="YourEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="About Me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={xURL}
                  onChange={(e) => setxURL(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}
                  placeholder="Full Name"
                />
              </Label>
            </div>
            {!loading ? (
              <Button onClick={() => handleUpdateProfile()} className="w-full">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating..."} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
