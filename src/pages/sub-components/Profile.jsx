import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full">
      <div className="">
        <div className="grid w-[100%] gap-6">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="text-balance text-muted-foreground">
            Full Profile View
          </p>
        </div>
        <div className="grid gap-4">
          <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              <img
                src={user && user.avatar && user.avatar.url}
                alt="avatar"
                className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
              />
            </div>

            <div className="grid gap-2 w-full sm:w-72">
              <Label>Resume</Label>
              <Link to={user && user.resume && user.resume.url} target="_blank">
                <img
                  src={user && user.resume && user.resume.url}
                  alt="resume"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </Link>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              defaultValue={user && user.fullName}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="text"
              defaultValue={user && user.email}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input
              type="text"
              defaultValue={user && user.phone}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>About Me</Label>
            <Textarea
              type="text"
              defaultValue={user && user.aboutMe}
              disabled
            ></Textarea>
          </div>
          <div className="grid gap-2">
            <Label>Portfolio URL</Label>
            <Input
              type="text"
              defaultValue={user && user.portfolioURL}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Github URL</Label>
            <Input
              type="text"
              defaultValue={user && user.githubURL}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn URL</Label>
            <Input
              type="text"
              defaultValue={user && user.linkedInURL}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Instagram URL</Label>
            <Input
              type="text"
              defaultValue={user && user.instagramURL}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Twitter(X) URL</Label>
            <Input
              type="text"
              defaultValue={user && user.xURL}
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Facebook URL</Label>
            <Input
              type="text"
              defaultValue={user && user.facebookURL}
              disabled
            ></Input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
