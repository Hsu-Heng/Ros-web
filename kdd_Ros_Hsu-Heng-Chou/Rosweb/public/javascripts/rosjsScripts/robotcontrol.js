

        // This function connects to the rosbridge server running on the local computer on port 9090
        var rbServer = new ROSLIB.Ros({
            url : 'ws://192.168.50.68:9090'
        });

        // This function is called upon the rosbridge connection event
        rbServer.on('connection', function() {
            // Write appropriate message to #feedback div when successfully connected to rosbridge
            var fbDiv = document.getElementById('feedback');
            fbDiv.innerHTML = "<p>Connected to Robot Operation System Server</p>";
        });

        // This function is called when there is an error attempting to connect to rosbridge
        rbServer.on('error', function(error) {
            // Write appropriate message to #feedback div upon error when attempting to connect to rosbridge
            var fbDiv = document.getElementById('feedback');
            fbDiv.innerHTML = "<p>Error connecting to websocket server</p>";
        });

        // This function is called when the connection to rosbridge is closed
        rbServer.on('close', function() {
            // Write appropriate message to #feedback div upon closing connection to rosbridge
            var fbDiv = document.getElementById('feedback');
            fbDiv.innerHTML = "<p>Connection to websocket server closed</p>";
        });

        /*
        Upper section of code necessary for ros bridge web server
        Lower section for elements in the page 
        */
    
        //Navigation and Map linses START-------------------
        var nav_viewer = 0;
        var nav_client = 0;
        function nav_and_map_init() {
            //Create nav2d canvas.
            nav_viewer = new ROS2D.Viewer({
                divID : 'nav2dmap',
                width : 500,
                height : 500
            });

            // Setup the nav client.
            nav_client = NAV2D.OccupancyGridClientNav({
                ros : rbServer,
                continuous: true,
                rootObject : nav_viewer.scene,
                viewer : nav_viewer,
                serverName : '/move_base',
                withOrientation : true
            });

        }
        function MapZoomFunc() {
            nav_viewer.scene.scaleX*=1.25;
            nav_viewer.scene.scaleY*=1.25;
        }      
        function MapPanFunc() {
            nav_viewer.scene.scaleX*=0.75;
            nav_viewer.scene.scaleY*=0.75;
        }          
        function cancelGoalFunc() {
            nav_client.navigator.cancelGoal();
        }
        //Navigation and Map linses END------------------------
   
        // Create mp4 main viewer.
        // function cam_init() {
	    //     var cam_viewer = new MJPEGCANVAS.Viewer({
		//         divID : 'mjpeg',
		//         host : 'localhost',
		//         width : 500,
		//         height : 500,
		//         topic : '/camera/rgb/image_raw'
	    //     });
        // }

        //This lines subscribe to odom
        var odomTopic = new ROSLIB.Topic({
            ros : rbServer,
            name : '/odom',
            messageType : 'nav_msgs/Odometry'
        });
        // move_group/display_planned_path
        // /move_base/TrajectoryPlannerROS/local_plan
        //This lines pull data from subscribed topic odom
        odomTopic.subscribe(function(message) {
            // var poseX = document.getElementById('poseX');
            // poseX.innerHTML  = "X = " + message.pose.pose.position.x
            // var poseY = document.getElementById('poseY');
            // poseY.innerHTML  = "Y = " + message.pose.pose.position.y
            // var poseTheta = document.getElementById('poseTheta');
            // poseTheta.innerHTML  = "Theta = " + message.pose.pose.orientation.w
            // var poseLinVel = document.getElementById('poseLinVel');
            // poseLinVel.innerHTML  = "LinVel = " + message.twist.twist.linear.x
            // var poseAngVel = document.getElementById('poseAngVel');
            // poseAngVel.innerHTML  = "AngVel = " + message.twist.twist.angular.z
        });

        //This lines subscribe to moveBase/Status
        var moveBaseStatusTopic = new ROSLIB.Topic({
            ros : rbServer,
            name : '/move_base/status',
            messageType : 'actionlib_msgs/GoalStatusArray'
        });
        //This lines pull data from subscribed topic moveBase/Status
        moveBaseStatusTopic.subscribe(function(message) {
            var movebaseStatus = document.getElementById('movebaseStatus');
            movebaseStatus.innerHTML  = "Status: " + message.status_list[0].text
        });

        // These lines create a topic object for publish twist message
        var cmdVelTopic = new ROSLIB.Topic({
            ros : rbServer,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });

        // These lines create a message to identify the twist message.Identifying the msg is required for publishing.
        // It initalizes all properties to zero. They will be set to appropriate values before we publish this message.
        var twist = new ROSLIB.Message({
            linear : {
                x : 0.0,
                y : 0.0,
                z : 0.0
            },
            angular : {
                x : 0.0,
                y : 0.0,
                z : 0.0
            }
        });

        //This functions are basic cmd_vel_control blocks
        function sleep(delay) {
            var start = new Date().getTime();
            while (new Date().getTime() < start + delay);
        }

        function moveSomeWhere(linVel, angVel) {
            twist.linear.x = linVel;
            twist.angular.z = angVel;
            
            cmdVelTopic.publish(twist);
        }

        function goforward() {
            moveSomeWhere(0.5, 0)
            sleep(100)
            moveSomeWhere(0, 0)
        }
        function gobackward() {
            moveSomeWhere(-0.5, 0)
            sleep(100)
            moveSomeWhere(0, 0)
        }
        function turnright() {
            moveSomeWhere(0, -0.5)
            sleep(100)
            moveSomeWhere(0, 0)
        }
        function turnleft() {
            moveSomeWhere(0, 0.5)
            sleep(100)
            moveSomeWhere(0, 0)
        }
