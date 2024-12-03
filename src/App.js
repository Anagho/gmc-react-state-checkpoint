import { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      person: {
        fullName: "John Doe",
        bio: "A software engineer passionate about React and web development.",
        imgSrc:
          "https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_1280.jpg",
        profession: "Software Engineer",
      },
      shows: false, // Controls visibility of the profile
      mountedTime: new Date(), // Timestamp for when the component was mounted
      timeInterval: 0, // Time elapsed since the component was mounted
    };
  }

  // Lifecycle method: called after the component is added to the DOM
  componentDidMount() {
    // Set up a timer to update the elapsed time every second
    this.timer = setInterval(() => {
      this.setState({
        timeInterval: Math.floor((new Date() - this.state.mountedTime) / 1000),
      });
    }, 1000);
  }

  // Lifecycle method: called just before the component is removed from the DOM
  componentWillUnmount() {
    // Clear the timer to prevent memory leaks
    clearInterval(this.timer);
  }

  // Method to toggle the visibility of the profile
  toggleShow = () => {
    this.setState((prevState) => ({ shows: !prevState.shows }));
  };

  render() {
    // Destructure state properties
    const { person, shows, timeInterval } = this.state;

    return (
      <Container className="mt-5 text-center">
        <h1>Profile Viewer</h1>
        <Button variant="primary" onClick={this.toggleShow}>
          {shows ? "Hide Profile" : "Show Profile"}
        </Button>
        {shows && (
          <Card className="mt-3 mx-auto" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={person.imgSrc} alt={person.fullName} />
            <Card.Body>
              <Card.Title>{person.fullName}</Card.Title>
              <Card.Text>
                <strong>Bio:</strong> {person.bio}
              </Card.Text>
              <Card.Text>
                <strong>Profession:</strong> {person.profession}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        <p className="mt-3">
          Time since component mounted: {timeInterval} seconds
        </p>
      </Container>
    );
  }
}

export default App;
