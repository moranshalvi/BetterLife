import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import lotusFlower from "../assets/img/5.png";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { userService } from "../services/user.service";

export const Hands = () => {
  const loggedInUser = userService.getLoggedinUser();
  const navigate = useNavigate();
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../assets/animation/hands.json"),
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      swal
        .fire({
          title: "feeling better?",
          text: "If so you can press the home button, otherwise, you can continue by clicking next",
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "Home",
          denyButtonText: "Next",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            if(loggedInUser){
              navigate("/patientHomePage");
            }
            else{
              navigate("/");
            }          } else if (result.isDenied) {
            navigate("/sea");
          }
        });
    }, 10000);
  }, []);

  return (
    <div className="hands">
      <img src={lotusFlower} className="lotusFlower" />
      <h1>settle down for a moment, relax, breathe and do the same!</h1>
      <div className="container flex" ref={container}></div>
      <a className="gohome" onClick={() => loggedInUser? navigate("/patientHomePage") : navigate("/")}>
        HOME
      </a>
    </div>
  );
};
