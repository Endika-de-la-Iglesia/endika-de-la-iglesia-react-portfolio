import React from "react";
import aboutImg from "../../../static/assets/images/auth/Intro_photo.png";

const About = () => {
  return (
    <div className="about-page-wrapper">
      <div
        className="about-left-side"
        style={{
          background: "url(" + aboutImg + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="about-right-side">
        <div className="about-text-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit primis,
            vivamus quisque felis nascetur mi platea maecenas potenti, et ornare
            viverra nisi proin varius neque. Neque mattis fusce felis torquent
            est pellentesque purus, eros mauris lobortis nisi dictumst interdum
            quam, tincidunt dignissim ridiculus venenatis nec tellus. Facilisi
            dictumst nullam placerat dignissim potenti vivamus platea magna non,
            ligula cum aliquam hac nec per ridiculus fusce ultricies sodales,
            justo risus netus odio nibh mi rhoncus gravida. Class fames viverra
            scelerisque ut gravida morbi lobortis commodo, sociis lectus justo
            aliquam tincidunt taciti facilisis in leo, sapien cursus varius
            potenti cras massa vel.
          </p>

          <p>
            Dictumst primis tristique fringilla nulla potenti vulputate cum
            inceptos nostra, ut tempor volutpat nec tincidunt metus cras magna
            donec platea, interdum morbi curabitur mollis semper scelerisque
            rhoncus sem. Nam maecenas parturient quis dictumst conubia aliquam
            lacus etiam, eleifend curae magna fermentum nibh et risus sociosqu
            neque, venenatis himenaeos ad faucibus pellentesque consequat
            libero. Ultricies risus molestie a consequat torquent mauris sem
            nisi placerat, quis semper urna euismod cum suspendisse nisl justo,
            non sodales class massa commodo imperdiet lacinia iaculis. Facilisis
            sed augue condimentum aliquet tincidunt suscipit dictumst lacus,
            commodo ridiculus cubilia non consequat himenaeos dis, libero
            pellentesque congue euismod curae vestibulum purus. Blandit cursus
            quisque nostra turpis vel penatibus urna dictum curae aptent nisl
            nulla bibendum, nunc litora arcu viverra luctus morbi ac non
            habitasse magnis fusce tellus. Mus fermentum dui suscipit nam
            elementum ut blandit id aliquet nascetur duis orci in vivamus,
            ridiculus eu erat vel ultrices sagittis purus platea aptent vehicula
            quis pellentesque hendrerit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
