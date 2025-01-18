import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import {
  clearAllSkillErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
  updateSkill,
} from "@/store/slices/skillSlice";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div>
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader classname="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage your skills</CardTitle>
              <Button classname="w-fit" onClick={handleReturnToDashboard}>
                Return to dashboard
              </Button>
            </CardHeader>
            <CardContent classname="grid sm:grid-cols-2 gap-4">
              {skills.map((element) => {
                return (
                  <Card key={element._id}>
                    <CardHeader classname="">
                      {element.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger as child>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="w-5 h-5 hover:text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent>delete</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter>
                      <Label className="text-2xl mr-2">Proficiency:</Label>
                      <Input
                        type="number"
                        defaultValue={element.proficiency}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={() => handleUpdateSkill(element._id)}
                      />
                    </CardFooter>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
