// Styles
import "./css/Main.css";
import "./css/Common.css";

// 3rd party libraries
import React from "react";

const Home = ({ userBlocked, loggedIn }) => {
  let initialText = "";
  if (userBlocked || !loggedIn) {
    initialText = "HOME";
  } else {
    if (loggedIn) {
      // Get the name from localstorage
      const userName = localStorage.getItem("userName");
      initialText = `WELCOME ${userName.toUpperCase()}`;
    }
  }

  return (
    <React.Fragment>
      {/* navbar header*/}
      <div className="Main">
        <h1 className="title">{initialText}</h1>
      </div>
      <div className="Main-body">
        <h1 className="body-title">introduction</h1>
        <div className="body-content">
          <h5 className="body-secondary-title">What are Algorithms?</h5>
          <ul className="content-points algorithm-points">
            <li className="content-points-items">
              Algorithms are basically a sequence of steps we perform to get a
              desired result. Alogrithms aren't restricted to programming. Even
              in our day-to-day lives we live by performing algorithms.
            </li>
            <li className="content-points-items">
              For example, take a simple task such as making ur breakfast.
              There's a series of steps involved to get the ultimate result
              which is the meal u consume. Algorithms can vary from something as
              simple as preparing ur breakfast to building complex softwares
            </li>
            <div className="content-imgs-flex">
              <img
                src="/imgs/recipe-algorithm.png"
                alt="Recipe for pita bread algorithm"
                width="500"
                height="300"
                className="algorithm-img"
              />
              <img
                src="/imgs/userflow.png"
                alt="userflow flowchart"
                width="500"
                height="300"
                className="algorithm-img"
              />
            </div>
            <ul className="algos-secondary-header">
              <li className="content-points-items sub-title list-item-no-deco">
                Why Do We Even Need Algorithms?
              </li>
              <li className="content-points-items">
                In todays world, one of the most important things is{" "}
                <strong>DATA</strong> . Data can be anything and everything!
              </li>
              <li className="content-points-items content-sub-items">
                Businesses and almost every company running in the modern world
                depends on a varitey of information. Ranging from customer,
                product information, click streams, time spent on a
                product/page/video etc.
              </li>
              <li className="content-points-items">
                All of this needs to be processed and shown in a way that is is
                useful for the comapy owners, stakeholders, employees and even
                the consumers.
              </li>
              <li className="content-points-items">
                This is when algorithms come into action. Algorithms are used to
                process millions and billions of data pieces in a matter of
                seconds or even in near-real time.
              </li>
            </ul>
            <ol className="algos-secondary-header">
              <li className="content-points-items sub-title list-item-no-deco">
                Key Pieces in Algorithms
              </li>
              <li value={1} className="content-points-items">
                Time Complexity (speed) - Number of insturctions executed to
                process the input and output a result. Higher the number of
                instructions the longer it will take to complete the process
              </li>
              <li className="content-points-items">
                Space Complexity (Memory) - Amount of memory (RAM) an algorithm
                uses to complete the process. Memory is normally used to store
                data and variables during its execution
              </li>
            </ol>
            <ul className="algos-secondary-header">
              <li className="content-points-items sub-title list-item-no-deco dive-header">
                Let's Dive in a bit Deeper
              </li>
              <ul className="algos-interior">
                <li className="content-points-items secondary-title list-item-no-deco">
                  Let's see How to Analyze Algorithms
                </li>
                <li className="content-points-items interior-points">
                  {" "}
                  When analyzing algorithms we check for the "
                  <strong>Worst Case Scenario</strong>". Meaning, the maximum
                  time it'll take for an algorithm to complete processing a
                  given data set.
                </li>
                <li className="content-points-items interior-points">
                  In technical terms, this worst case scenario is known as{" "}
                  <strong>Big 'O' runtime</strong> .
                </li>
                <li className="content-points-items interior-points">
                  The "quality" of an algorithm depends on how it scales with
                  the input size. If the performance (time taken to complete,
                  memory used) of the algorithm degrades as the input size
                  increases, it means that the algorithm in use probably isn't
                  the best fit for the use case
                </li>
                <li className="content-points-items interior-points">
                  Following are some of the basic ways we can analyze an
                  algorithm
                </li>
                <ul className="algos-interior">
                  <li className="content-points-items interior-points">
                    <i>Loop Analysis</i>- Examining the number of loops (for
                    loop, while loop), especially nested loops and the sum of
                    operations happening within the loops. The sum of the
                    operations in the loops and the number of iterations of the
                    loop will help us get an idea of the runtime of the
                    algorithm
                  </li>
                  <img
                    src="/imgs/Loop-Analysis.jpg"
                    alt="JS loop analysis example"
                    width="500"
                    height="300"
                    className="algorithm-img"
                  />
                  <li className="content-points-items interior-points">
                    <i>Experimental Analysis</i> - Running the algorithm on
                    various input sizes helps us better understand how it works
                  </li>
                  <li className="content-points-items interior-points">
                    <i>Graphical Analysis</i> - Plotting the runtime or memory
                    usage against the input size on a graph will help us
                    understand how the algorithm behaves as the input size grows
                  </li>
                  <li className="content-points-items interior-points margin-b-light">
                    <i>Profiling tools</i> - Let's us measure the actual runtime
                    and memory usage. Some tools you can use are
                    <a
                      href="https://www.dynatrace.com/"
                      className="item-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dynatrace
                    </a>{" "}
                    and
                    <a
                      href="https://newrelic.com/"
                      className="item-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      New Relic
                    </a>
                  </li>
                </ul>
                <li className="content-points-items interior-points">
                  Lemme give you some examples on when algorithms in software
                  had mishaps. This could probably help you understand a little
                  bit further on why designing algorithms should be done
                  carefully
                </li>
                <ol className="algos-interior">
                  <li className="content-points-items content-point-items-heavy">
                    Amazon Price-Glitch 2018:
                  </li>

                  <li className="interior-paragraph">
                    Amazon's 3rd party marketplace is an integral part of
                    Amazon.com as it allows sellers who aren't amazon to list
                    and sell their own products alongside Amazon products
                  </li>
                  <li className="interior-paragraph">
                    Many of these sellers depend on algorithmic pricing tools to
                    adjust their products prices based on factors such as
                    demand, competion and more without human intervention
                  </li>
                  <li className="interior-paragraph">
                    To help this, Amazon internally uses 3rd party application
                    from Derry-based firm RepricerExpress that does the job for
                    them which happend to glitch on a Friday evening
                  </li>
                  <li className="interior-paragraph">
                    The consequence was a substantial loss for the sellers who
                    depended on this algorithm. Reason being, the algorithm
                    started pricing items at just 1p!!.
                  </li>
                  <a
                    href="https://www.computerworld.com/article/3426203/amazon-1p-price-glitch--when-automated-systems-go--wrong-.html"
                    className="item-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                  <li
                    className="content-points-items content-point-items-heavy"
                    value={2}
                  >
                    Knight Capital Trading Glitch:
                  </li>
                  <li className="interior-paragraph">
                    Knight Capital is a financial services firm. Their algorithm
                    is responsible for routing and executing stock exchanges
                  </li>
                  <li className="interior-paragraph">
                    In 2012 the algorithm glitched making unintended buy orders
                    which caused the company to lose $440 Million in just 45
                    minutes!🤯🤯
                  </li>
                  <a
                    href="https://money.cnn.com/2012/08/09/technology/knight-expensive-computer-bug/index.html"
                    className="item-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </ol>
              </ul>
            </ul>
          </ul>
          <h5 className="body-secondary-title">What are Data Structures?</h5>
          <ul className="content-points ds-points">
            <li className="content-points-items">
              For example, take a simple task such as making ur breakfast.
              There's a series of steps involved to get the ultimate result
              which is the meal u consume. Algorithms can vary from something as
              simple as preparing ur breakfast to building complex softwares
            </li>
            <li className="content-points-items">
              For example, take a simple task such as making ur breakfast.
              There's a series of steps involved to get the ultimate result
              which is the meal u consume. Algorithms can vary from something as
              simple as preparing ur breakfast to building complex softwares
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
