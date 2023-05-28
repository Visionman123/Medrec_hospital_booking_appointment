# vgupe2023_team6
## Project: [Medical record management system](Project_Proposal.pdf) 
## Members:
 1. 17885 - Nguyễn Hoàng Nam - @Visionman123 (Project Manager)
 2. 17116 - Vĩnh Nguyễn Phước Bảo Minh - @minhnguyen1312
 3. 17647 - Mai Nguyễn Vy - @vymai
 4. 17835 - Phạm Như Ngọc - @17835
 5. 17975 - Tăng Thành Đạt - @DatLit1
 6. 18148 - Nguyễn Ngô Minh Trí -  @Yxxeratia
 7. 17422 - Phạm Trương Nhật Nguyên - @TiChuts
 8. 17306 - Trần Minh Ngọc - @MichelleTran02

For efficient task management and collaboration, our team utilizes Notion as our primary platform. You can find more details about our project progress, task assignments, and documentation by accessing our Notion workspace at [Notion vgupe2023_team6](https://www.notion.so/Teamspace-Home-5979b532bd224c6bbb6cdd5f7af3f2c6).
 
<div align="center">
<img src="../report/img/hospital.jpg" alt="Hospital" width="600"/>
</div>

# Table of Content
- [1. Introduction](#1-introduction)
  - [1.1 Purpose of the Document](#11-purpose-of-the-document)
  - [1.2 Scope of the Development Project](#12-scope-of-the-development-project)
  - [1.3 Constraints](#13-constraints)
    - [1.3.1 Data Format Inconsistency](#131-data-format-incosistency)
    - [1.3.2 Non-framework development](#132-non-framework-development)
    - [1.3.3 Initial Documentation Absence](#133-initial-documentation-absence)
    - [1.3.4 Delayed Integration of Docker and CI/CD](#134-delayed-integration-of-docker-and-cicd)
- [2. System Architecture Description](#2-system-architecture-description)
  - [2.1 Overview of Modules Components](#21-overview-of-modules-components)
  - [2.2 Structure and Relationships](#22-structure-and-relationships)
    - [2.2.1 Front-end interface](#221-front-end-interface)
    - [2.2.2 Back-end server](#222-back-end-server)
    - [2.2.3 Database management system](#223-database-management-system)
    - [2.2.4 Security and privacy](#224-security-and-privacy)
  - [2.3 User Interface Issues](#23-user-interface-issues)
  - [2.4 Analysis Model](#24-analysis-model)
    - [2.4.1 Use case diagram](#241-use-case-diagram)
    - [2.4.2 Sequence diagram](#242-sequence-diagram)
    - [2.4.3 Class diagram](#243-class-diagram)
    - [2.4.4 ER diagram](#244-er-diagram)
- [3. External Interface Requirements](#3-external-interface-requirements)
  - [3.1 Description of Login Screen](#31-description-of-login-screen)
  - [3.2 Description of Doctor Homepage](#32-description-of-doctor-homepage)
  - [3.3 Description of Treatment](#33-description-of-treatment)
  - [3.4 Description of Patient Homepage](#34-description-of-patient-homepage)
  - [3.5 Description of Appointment Booking](#31-description-of-appointment-booking)
  - [3.6 Description of Review record](#36-description-of-review-record)
  - [3.7 Description of Set Patient Information](#37-description-of-set-patient-information)
- [4. Design Decisions and Tradeoffs](#4-design-decisions-and-tradeoffs)
  - [4.1 User Interface Design](#41-user-interface-design)
    - [4.1.1 Logo Design Concept](#411-logo-design-concept)
    - [4.1.2 Font Design](#412-font-design)
    - [4.1.3 Color Theme](#413-color-theme)
  - [4.2 Security Measures](#42-security-measures)
  - [4.3 Database Design](#43-database-design)
    - [4.3.1 Database Description](#431-database-description)
    - [4.3.2 Table Description](#432-table-description)
  - [4.4 Tradeoffs](#44-tradeoffs)
- [5. Deployement](#5-deployment)
  - [5.1 Docker](#51-docker)
  - [5.2 Git CI/CD](#52-git-cicd)
    - [5.2.1 Build Stage](#521-build-stage)
    - [5.2.2 Test Stage](#522-test-stage)
  - [5.3 Running App](#53-running-app)
- [6. Appendices](#6-appendices)
  - [Appendix A: Glossary of Terms](#appendix-a-glossary-of-terms)
  - [Appendix B: Scrum review](#appendix-b-scrum-review)
  - [Appendix C: Gantt chart](#appendix-c-gantt-chart)
  - [Appendix D: Product Backlog](#appendix-d-product-backlog)
  - [Appendix E: References](#appendix-e-references)

# 1. Introduction
## 1.1 Purpose of the Document
The purpose of this document is to provide a clear and detailed design specification for a booking appointment system for a hospital, which will enable patients to schedule appointments with medical professionals in a quick and efficient manner.
## 1.2 Scope of the Development Project
The online booking appointment system will enable outpatients to book, reschedule, or cancel appointments, and it will also provide doctors access to the schedule through a web interface. Once a diagnosis has been made, doctors can save it together with the patient's prescription in the online patient record.
## 1.3 Constraints
### 1.3.1 Data Format Inconsistency
The developers are facing difficulties in coding due to a mismatch between the date format used in the database and the date format used in the code. This inconsistency is causing constraints in running the code and calling out the dates. Consequently, this issue is leading to errors and unexpected behavior in the code, as the dates cannot be parsed and manipulated accurately.
### 1.3.2 Non-framework Development
Developing our web application without utilizing a framework presented several challenges for our team. The absence of pre-built components, standardized practices, and automated tools typically provided by frameworks contributed to the following difficulties:

1. **Code Organization and Structure:** Without a framework's predefined structure, our team had to establish coding conventions and devise an appropriate file organization system from scratch. This required additional effort and meticulous planning to ensure consistent and maintainable code throughout the project.
2. **Manual Configuration and Setup:** Frameworks often automate common configurations and provide boilerplate code, significantly reducing development time and effort. However, in the absence of a framework, our team had to manually configure various aspects of the application, such as routing, database connections, and server settings. This resulted in increased development time and introduced a higher risk of manual errors.
3. **Lack of Built-in Features:** Frameworks typically offer a range of built-in features and functionalities that accelerate development, such as form validation, user authentication, and database integration. Without these ready-to-use components, our team had to implement these features from scratch, resulting in additional development time and potential inconsistencies across the application.

These challenges highlight the additional complexities and efforts encountered by our team when developing the web application without relying on a framework. While it provided flexibility and a deeper understanding of the underlying technologies, leveraging a framework can significantly streamline development, enhance productivity, and ensure adherence to best practices.
### 1.3.3 Initial Documentation Absence
Developing the web application without an initial documentation posed additional challenges for our team. The absence of a well-defined document at the beginning required us to invest more effort in organizing and aligning our development process. Some of the key difficulties we encountered include:

1. **Requirement Gathering and Understanding:** Without a documented set of requirements, our team had to rely on direct communication with stakeholders to understand their needs and expectations. This necessitated conducting more frequent meetings, gathering feedback, and continuously iterating on the requirements, which added complexity and extended the requirement gathering phase.
2. **Scope Management:** The absence of a clear document outlining the project's scope made it challenging to establish boundaries and prioritize tasks effectively. Our team had to rely on ongoing discussions and feedback to define and refine the scope, which increased the risk of scope creep and required continuous adjustments to accommodate evolving requirements.
3. **Communication and Collaboration:** A lack of initial documentation meant that our team had to rely heavily on direct communication and collaboration among team members. Clear and effective communication became crucial for sharing ideas, aligning on design decisions, and ensuring everyone had a shared understanding of the project's goals and objectives.

Despite these challenges, our team adopted an agile and iterative approach to tackle the project. We emphasized frequent communication, collaboration, and regular feedback sessions with stakeholders to mitigate the impact of the initial documentation gaps. By adapting our processes and maintaining open lines of communication, we were able to navigate the challenges and successfully progress in the development of the web application.
### 1.3.4 Delayed Integration of Docker and CI/CD
Despite implementing Docker and CI/CD at a later stage in the project, we encountered significant challenges due to the deferred adoption of these practices. The difficulties arose from retroactively integrating Docker and CI/CD into an existing codebase and development process, resulting in complexities and hurdles that could have been mitigated by incorporating these tools from the project's inception. Some of the key challenges we faced include:

1. **Retrofitting Docker:** Integrating Docker into an already developed application proved to be a complex and time-consuming task. The process involved containerizing the application, configuring container networking, managing dependencies, and ensuring compatibility with existing infrastructure. Retrofitting Docker required significant effort in modifying existing code and infrastructure setups, which could have been avoided with an initial implementation.

2. **Establishing CI/CD Pipelines:** Setting up CI/CD pipelines for an existing codebase presented challenges in configuring build, test, and deployment processes. Adapting the application to conform to automated testing, continuous integration, and deployment practices required substantial refactoring and modification of existing code. This process was intricate and involved resolving compatibility issues, creating appropriate testing environments, and ensuring seamless deployment across different environments.

3. **Integration Challenges:** Incorporating Docker and CI/CD into a project already in progress introduced integration challenges. It required reconciling existing development practices and workflows with the new tools and processes. Coordinating the efforts of the development team, ensuring proper version control, and managing conflicts during the integration phase posed additional complexities.

The difficulties encountered in implementing Docker and CI/CD at a later stage underscore the importance of adopting these practices early in the development lifecycle. Doing so would have allowed for smoother integration, reduced complexities, and improved efficiency throughout the project. It serves as a valuable lesson to prioritize and plan for the adoption of essential tools and practices from the project's outset to ensure seamless integration and maximize the benefits they offer.
# 2. System Architecture Description
## 2.1 Overview of Modules Components
The booking appointment system consists of several modules/components that work together to provide a comprehensive and user-friendly platform for patients and medical staff. The following modules/components have been identified and addressed in the design of the system:

1. **Authentication Module:** This module handles user authentication and allows both patients and doctors to sign in to the app. It also includes a signup feature for new patients to create an account.  
2. **Appointment Booking Module:** This module allows patients to book appointments online by selecting a date and time that is convenient for them. The module is designed to be intuitive and easy to use, and includes features such as automatic confirmation and reminders to help patients manage their schedules effectively.
3. **Patient Profile Module:**
This module allows patients to set up and manage their profile within the app. It enables patients to enter and update their personal information and medical note, view their own patient records, and manage their preferences.
4. **Doctor's Dashboard Module:**
This module provides doctors with a dashboard where they can view today's appointments, including the time and names of patients. It also allows doctors to access patient records.
5. **Patient Record Management Module:**
This module handles the management of patient records. It includes functionalities for doctors to create new patient records, add diagnosis, medical indications, and prescriptions. It also enables doctors to view and access previous patient records for reference purposes.


By addressing these modules/components, the booking appointment system can provide a comprehensive and user-friendly platform for patients and doctors to manage their schedules effectively. The system is designed to be flexible, secure, and easy to use, while also providing robust features and functionality that meet the needs of a modern hospital.
## 2.2 Structure and Relationships
The booking appointment system is comprised of several components that work together to facilitate the scheduling of appointments. The following structure and relationships have been identified and addressed in the design of the system:
### 2.2.1 Front-end interface
This is the part of the system that patients and medical staff interact with, and is designed to be intuitive, user-friendly, and responsive. The interface is divided into different sections, including appointment booking, profile creating and medical record reviewing , medical staff schedule viewing, and the creation of new medical records for patients during their appointments.
### 2.2.2 Back-end server
This component handles the processing and storage of data, and communicates with the front-end interface to provide real-time updates and data synchronization. The server is responsible for maintaining patient and medical staff data, appointment schedules, and system configurations.
### 2.2.3 Database management system
This is the software that manages the database used by the system, and is responsible for storing and retrieving data efficiently and accurately. The database management system is designed to be scalable, reliable, and secure, and to support complex data structures.
### 2.2.4 Security and privacy
The system is designed with security and privacy in mind, and includes features such as encryption, authentication, and access control to ensure that patient data is protected at all times. JSON Web Tokens (JWT) are utilized as the authentication mechanism, providing secure and efficient token-based authentication.

The system implements the OAuth2 framework in conjunction with JWT, ensuring secure and standardized access control to the application. OAuth2 allows users, both patients and doctors, to securely authenticate and access the system using their respective OAuth2 credentials. The combination of OAuth2 and JWT provides a robust authentication mechanism, reducing the risk of unauthorized access and enhancing the overall security of the system.

Furthermore, the system adheres to relevant regulations and standards outlined by HIPAA, including the secure handling and storage of patient data. By implementing encryption, authentication, and access control measures, the system ensures that patient data remains confidential and protected from unauthorized access.

<div align="center">
<img src="../report/img/InformationArchitecture.png" alt="Informtion Architecture" width="600" height="400"/>
</div>

## 2.3 User Interface Issues

The user interface of the booking appointment system is crucial as it is the primary point of interaction between patients and the hospital. The system design addresses the following UI issues:

1. **Simplify Navigation:** Streamline the navigation structure, making it intuitive and easy to understand. Use clear labels, hierarchical menus, and breadcrumbs to guide users through the application. Conduct user testing to validate the effectiveness of the navigation design.
2. **Ensure Consistent Design:** Create a consistent visual design throughout the interface by using a cohesive color scheme, typography, and layout. Establish design patterns and guidelines to maintain consistency across different screens and interactions.
3. **Prioritize Information:** Organize information in a clear and logical manner. Utilize hierarchy, grouping, and visual cues to guide users' attention to the most important elements. Consider progressive disclosure techniques to present information in a manageable way.
4. **Provide Clear Feedback:** Offer immediate and meaningful feedback for user actions. Use visual indicators, success messages, or error messages to inform users about the outcome of their interactions. Ensure feedback is concise, easy to understand, and located in close proximity to the action.
5. **Simplify Forms and Inputs:** Streamline forms by reducing unnecessary fields and providing clear instructions. Use inline validation to provide real-time feedback on input errors. Consider utilizing autocomplete or default values to expedite the form-filling process.
6. **Optimize Performance:** Improve loading times, response rates, and overall performance. Optimize image sizes, leverage caching techniques, and minimize unnecessary animations or delays that could impact the user experience.
7. **Conduct User Testing:** Regularly involve users in the design process through usability testing and feedback sessions. Observe how users interact with the interface, gather their feedback, and iterate on the design based on their insights.

Addressing these UI issues can result in a user-friendly and efficient booking appointment system that meets the needs of both patients and medical staff, ultimately improving the overall patient experience.

## 2.4 Analysis Model
### 2.4.1 Use case diagram
<div align="center">
<img src="../report/img/UseCase.png" alt="Use Case Diagram" width="800" height="500"/>
</div>

### 2.4.2 Sequence diagram
1. **Doctor:**
<div align="center">
<img src="../report/img/SequenceDoctor.png" alt="Doctor Sequence Diagram" width="600" height="400"/>
</div>

2. **Patient:**
<div align="center">
<img src="../report/img/SequencePatient.png" alt="Patient Sequence Diagram" width="600" height="400"/>
</div>

### 2.4.3 Class diagram
<div align="center">
<img src="../report/img/ClassDiagram.png" alt="Class Diagram" width="500" height="700"/>
</div>

### 2.4.4 ER diagram
<div align="center">
<img src="../report/img/ERDiagram.png" alt="ER Diagram" width="800" height="500"/>
</div>

# 3. External Interface Requirements
## User flow
### Flow for doctor
<div align="center">
<img src="../report/img/UserFlowDoctor.png" alt="User Flow Doctor" width="600" height="300"/>
</div>

### Flow for patient
<div align="center">
<img src="../report/img/UserFlowPatient.png" alt="User Flow Patient" width="600" height="400"/>
</div>

## 3.1 Description of Login Screen
<div align="center">
<img src="../report/img/3_1_gif.gif" alt="Login Screen" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>LM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Login Module provides a secure and authenticated login screen for medical staff to access the hospital system.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td>The system must be connected to the hospital's database to verify user credentials and access permissions.</td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the hospital database to verify user credentials and access permissions, as well as with the user interface for medical staff to input their login credentials.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for medical staff to input their login credentials, as well as a backend system to verify user credentials and access permissions.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes medical staff requests to access the hospital system, verifying their login credentials and access permissions.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module retrieves user login credentials and access permissions from the hospital database.</td>
  </tr>
</table>

## 3.2 Description of Doctor Homepage 
<div align="center">
<img src="../report/img/3_2_gif.gif" alt="Doctor Homepage" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>DHM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Doctor Homepage Module provides doctors with a centralized location to access their schedule, view the number of patients they are scheduled to see, and manage their appointments.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td>The system must be connected to the hospital's database to retrieve doctor and appointment information..</td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the hospital database to retrieve doctor and appointment information, as well as with the user interface for doctors to view their schedule and manage their appointments.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for doctors to interact with and a backend system to retrieve appointment and doctor information.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes doctor requests to view their schedule and manage their appointments, retrieving data from the hospital database and presenting it to the doctor in a user-friendly format.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module retrieves appointment and doctor information from the hospital database.</td>
  </tr>
</table>

## 3.3 Description of Treatment 
<div align="center">
<img src="../report/img/3_3_gif.gif" alt="Treatment" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>TM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Treatment Module allows doctors and medical staff to input and update patient medical records.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td></td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the hospital database to retrieve and update patient medical records, as well as with the user interface for doctors and medical staff to input and update medical records.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for doctors and medical staff to input and update medical records, as well as a backend system to retrieve and update patient medical records.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes medical staff requests to input and update patient medical records, retrieving and updating data from the hospital database.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module retrieves and updates patient medical records from the hospital database.</td>
  </tr>
</table>

## 3.4 Description of Patient Homepage 
<div align="center">
<img src="../report/img/3_4_gif.gif" alt="Patient Homepage" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>PHM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Patient Homepage Module serves as a central hub for patients to access all the features of the hospital's system, including setting personal information, viewing their medical record, booking appointments, and logging in and out of the system.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>Set Patient Information Module, Patient Record Review Module, Appointment Booking Module, Login/Logout Module</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td>The system must be connected to the hospital's database to retrieve patient information.</td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the Set Patient Information, Patient Record Review, Appointment Booking, and Login/Logout modules to provide patients with access to all the features of the system.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for patients to interact with and a backend system to process patient requests.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes patient requests to set personal information, view medical records, book appointments, and log in and out of the system, retrieving data from the hospital database and presenting it to the patient in a user-friendly format.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module retrieves patient information from the hospital database and allows patients to input personal information and book appointments.</td>
  </tr>
</table>

## 3.5 Description of Appointment Booking 
<div align="center">
<img src="../report/img/3_5_gif.gif" alt="Appointment Booking" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>ABM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Appointment Booking Module allows patients to book appointments online by selecting a date and time that is convenient for them.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td>The system must be connected to the hospital's database to verify the availability of medical staff.</td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the hospital database to ensure that available time slots are displayed accurately.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for patients to select a date and time, as well as a backend system to verify the availability of medical staff.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes patient requests to book appointments and checks the availability of medical staff before confirming the booking.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module stores patient booking information in the hospital database, including the patient's name, appointment date and time, and medical staff assigned to the appointment.</td>
  </tr>
</table>

## 3.6 Description of Review Record
<div align="center">
<img src="../report/img/3_6_gif.gif" alt="Review Record" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>PRRM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Patient Record Review Module allows patients to view their medical record, including past appointments, diagnoses, and indications.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td>The system must be connected to the hospital's database to retrieve patient information.</td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the hospital database to retrieve patient medical record information, as well as with the user interface for patients to view their record.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for patients to view their medical record, as well as a backend system to retrieve patient information.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes patient requests to view their medical record, retrieving data from the hospital database and presenting it to the patient in a user-friendly format.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module retrieves patient medical record information from the hospital database.</td>
  </tr>
</table>

## 3.7 Description of Set Patient Information 
<div align="center">
<img src="../report/img/3_7_gif.gif" alt="Set Patient Information" width="600">
</div>
<table style="width: 500px;">
  <tr>
    <th>Identification</th>
    <td>SPIM</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>User Interface</td>
  </tr>
  <tr>
    <th>Purpose</th>
    <td>The Set Patient Information Module allows patients to input and update their demographic and medical information, and medical staff to access and update patient information as needed.</td>
  </tr>
  <tr>
    <th>Subordinates</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Dependencies</th>
    <td>The system must be connected to the hospital's database to store and retrieve patient information.</td>
  </tr>
  <tr>
    <th>Interfaces</th>
    <td>The module interfaces with the hospital database to store and retrieve patient information, as well as with the user interface for patients to input and update their information and for medical staff to access and update patient information.</td>
  </tr>
  <tr>
    <th>Resources</th>
    <td>The module requires a user interface for patients to input and update their demographic and medical information, as well as a backend system to store and retrieve patient information.</td>
  </tr>
  <tr>
    <th>Processing</th>
    <td>The module processes patient requests to input and update their information, storing and retrieving data from the hospital database. Medical staff can also access and update patient information as needed.</td>
  </tr>
  <tr>
    <th>Data</th>
    <td>The module stores and retrieves patient demographic and medical information in the hospital database.</td>
  </tr>
</table>

# 4. Design Decisions and Tradeoffs
During the development of the booking appointment system for hospitals, there were several design decisions and tradeoffs that needed to be made. The following are some of the key decisions and tradeoffs:
## 4.1 User Interface Design
<div align="center">
<img src="../report/img/ScreenRelationship.png" alt="Screen Relationship" width="600" height="400"/>
</div>

One of the key design decisions was the user interface design. The system needed to be user-friendly and intuitive to use for both patients and healthcare providers. The design team opted for a simple and clean design with clear navigation and easy-to-use forms. However, this simplicity meant that some advanced features, such as customization options for appointment scheduling, had to be sacrificed.
### 4.1.1 Logo Design Concept
<div align="center">
<img src="../report/img/Logo.png" alt="Screen Relationship" width="400"/>
</div>

In our medical app, we have a distinctive team logo that embodies our brand identity and represents our commitment to delivering efficient and reliable healthcare services. The logo features a blue circle, symbolizing trust, stability, and professionalism. Inside the circle, there is a white folder, symbolizing organization and the secure storage of patient information.

The choice of colors, with blue as the primary color, reflects our dedication to creating a calming and trustworthy environment for both doctors and patients. The circular shape signifies unity, inclusivity, and the continuous nature of care.

Our team logo is prominently displayed throughout the application, providing visual consistency and reinforcing our brand presence. It serves as a visual cue to users, instilling a sense of familiarity and trust in the system.

The logo design was carefully crafted to align with our vision and values as a healthcare provider. It underwent a collaborative design process, incorporating input from team members and feedback from stakeholders. The final logo captures the essence of our medical app and contributes to a cohesive and professional user experience.

Overall, our team logo is an integral part of our app's visual identity, enhancing brand recognition and establishing a strong visual connection with our users.
### 4.1.2 Font Design
For our application, we have carefully chosen fonts to enhance readability and create a visually pleasing user interface. The following fonts have been selected:

- **Header Font**: Lato (**[Google Fonts Link](https://fonts.googleapis.com/css?family=Lato)**): Lato is used for headers and provides a clean and modern look to the application.
- **Button Font**: Montserrat (**[Google Fonts Link](https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap)**): Montserrat is utilized for buttons, giving them a bold and distinctive appearance.
- **Paragraph Font**: Nunito (**[Google Fonts Link](https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap)**): Nunito is used for paragraphs, ensuring legibility and readability of the content.
- **Alternative Font**: Poppins (**[Google Fonts Link](https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap)**): Poppins is an additional font option, offering a range of weights for various design elements.

By combining these fonts, we create a harmonious and visually appealing typography throughout our application, enhancing the overall user experience.
### 4.1.3 Color Theme
<div align="center">
<img src="../report/img/ColorTheme.png" alt="Color Theme" width="600"/>
</div>

The color theme for our application is designed to create a visually pleasing and cohesive user interface. The primary color used throughout the application is #0097B2, a vibrant blue shade that represents trust and professionalism in the medical field.

To add visual interest and highlight important elements, we have selected a range of accent colors that complement the base color:

- #28A9C3
- #51BBD5
- #7ACDE6
- #A3DFEE
- #CCEFF7

Buttons in our application are designed with a clean and minimalist approach, using a white color (#FFFFFF) to provide a clear contrast against the background. When users hover over buttons, the color changes to #007D93, creating a subtle interactive effect.

By utilizing this color theme consistently throughout the application, we aim to create a visually appealing and cohesive user experience for our users.

## 4.2 Security Measures
Ensuring the security and protection of patient data is a top priority for our application. The following security measures have been implemented to safeguard sensitive information:

1. **Encryption:** All sensitive data, including patient records and personal information, are encrypted using the Advanced Encryption Standard (AES) with a 256-bit encryption key. This ensures that even if the data is accessed without authorization, it remains unreadable and unusable.
2. **Secure Authentication:** The application employs a robust authentication mechanism based on industry-standard practices. Users, including doctors and patients, are required to provide valid credentials (such as username and password) to access the system. This prevents unauthorized access and helps verify the identity of each user.
3. **OAuth2 Authorization:** We have implemented the OAuth2 framework for authorization. OAuth2 enables secure and controlled access to the application by allowing users to grant or revoke permissions for third-party applications. This ensures that only authorized applications can access user data and perform specific actions on their behalf.
4. **Session Timeout:** To enhance security, the application enforces a session timeout of 30 minutes. If a user remains inactive for this duration, the session is automatically terminated, requiring the user to log in again to continue using the application. This mitigates the risk of unauthorized access if a user leaves their session unattended.
5. **Role-Based Access Control:** Access to different parts of the application is strictly controlled based on the user's role. Doctors have access to their work calendar, patient records and the ability to create medical records and adds diagnosis, indication and prescription, while patients have limited access to their own records and book appointment. This ensures that sensitive data is only accessible to authorized individuals.
6. **Compliance with HIPAA:** Our application complies with the Health Insurance Portability and Accountability Act (HIPAA), which sets forth guidelines and regulations for protecting patient privacy and data security. By adhering to HIPAA standards, we ensure that patient information is handled and stored in a secure and confidential manner.

By implementing these security measures, we are committed to maintaining the confidentiality, integrity, and availability of patient data, providing a secure environment for both doctors and patients to interact with the application.
## 4.3 Database Design
The database design is a critical aspect of the hospital booking appointment system, as it is responsible for organizing and managing the various types of data required by the system. In this system, the database is built using Postgres and stored in PgAdmin. The database contains various types of information, including doctor, patient, medicine, appointment time, booking time, and more. To ensure that the system can efficiently retrieve and manipulate data, the design team opted for a relational database design. This design allows for easy organization of data into tables and relationships between them, enabling the system to quickly retrieve and manipulate data as needed. By implementing an effective database design, the hospital booking appointment system can ensure that it has access to the data it needs to provide efficient and effective services to patients and medical staff.
### 4.3.1 Database Description
The **Hospital Management System** (HMS) database is designed to store and manage patient information in the hospital. This system allows the patient to easily access patient information, set up appointment, keep up with the hospital news, at the same time providing doctors with quick overview of their schedules and access to patient history and medical records.

The HMS database schema consists of EIGHT tables: hms_user, doctor, department, patient, appointment, medicine, prescription and pres_med, seven of which is required to provide sufficient description for the system, while hms_user is used for data access and security in a database.

- **hms_user** table includes a unique ID given for patient and doctor, a password. When logging in, it generates a token for the user in a given time frame. After the token expires, the user needs to log in to the system again. This authentication method helps ensure fast and secured access to records.

- **Department** table in a medical management system serves the function of storing information about different departments within a healthcare facility
- **Patient** table includes basic demographic information, such as first name, last name, date of birth, sex, contact information and address. Each patient is granted a unique ID. The patient information is encrypted into an unreadable format making it incomprehensible to unauthorized individuals who gain access to the database. 
- **Doctor** table provides basic information including first name, last name, date of birth, contact information what department the doctor is specialized in and the office room of the doctor. Each doctor is given a unique ID (different from patient and other doctors).
- **Appointment** table indicates on record the doctor, patient, exact date and time of an appointment. The composition between doctor, patient and date is unique, making allowance for no patient is going to have more than one appointment to one doctor in a day.

- **Prescription** table tells the medical records of a patient which is uniquely identified with the prescription ID. This table also gives the information of the prescription date, patient ID, doctor ID, medical indications and diagnosis after an appointment happened.

- **Medicine** table gives the hospital information about the availability of drugs in storage.

- **Pres_med** table gives the patient information about what medicine to take after a medical examination and a prescription is given.
### 4.3.2 Table Description
- **User:** Each doctor and patient is given an **ID** and **password**
<div align="center">
<img src="../report/img/TableHMSUser.png" alt="Table hms_user" width="600"/>
</div>

- **Patient:**
<div align="center">
<img src="../report/img/TablePatient.png" alt="Table patient" width="600"/>
</div>

- **Doctor:** 
<div align="center">
<img src="../report/img/TableDoctor.png" alt="Table doctor" width="600"/>
</div>

- **Appointment:**
<div align="center">
<img src="../report/img/TableAppointment.png" alt="Table appointment" width="600"/>
</div>

- **Prescription:** Contains the essential information of an appointment. Added an extra “note” column for allergies and pre-medication conditions.
<div align="center">
<img src="../report/img/TablePrescription.png" alt="Table prescription" width="600"/>
</div>

- **Pres_med:** Contained in the prescription table of medical record.
<div align="center">
<img src="../report/img/TablePresMed.png" alt="Table pres_med" width="600"/>
</div>

## 4.4 Tradeoffs
In addition to these specific design decisions, there were also tradeoffs that had to be made during the development of the system. For example, the system needed to balance the need for flexibility and customization with the need for simplicity and ease of use. The system also needed to balance the need for advanced features with the need for reliability and stability.  

Overall, the design decisions and tradeoffs were carefully considered to ensure that the booking appointment system for hospitals met the needs of both patients and healthcare providers while also being secure, efficient, and scalable.
# 5. Deployment
In our project, we have integrated Docker and CI/CD (Continuous Integration and Continuous Deployment) to optimize our development workflow and streamline the deployment process. This combination offers numerous benefits, enabling efficient collaboration, improved reliability, and simplified application management.
## 5.1 Docker
Docker is a containerization platform that allows us to package our application and its dependencies into lightweight, portable containers.
<div align="center">
<img src="../report/img/Docker.png" alt="Docker" width="600"/>
</div>

1. **App Container:**
The App container serves as a central component that combines both the front-end and server components of our application. By encapsulating these elements within a single container, we ensure their seamless integration and facilitate ease of deployment. This container is responsible for handling user interactions, processing requests, and delivering the application's functionality.
2. **Database Container:**
The Database container is dedicated to hosting our database system, specifically PostgreSQL in our case. By utilizing Docker, we can isolate and manage the database environment separately from the application components. This approach offers several advantages, including enhanced security, scalability, and portability. The Database container ensures the availability and reliability of our database, allowing the application to store and retrieve data efficiently.
3. **PgAdmin Container:**
The PgAdmin container plays a crucial role in managing the PostgreSQL database. It hosts the PgAdmin tool, which provides a graphical interface for administrators to interact with and manage the database. By containerizing PgAdmin, we create a separate environment that allows for easy administration and monitoring of the database system. The PgAdmin container simplifies tasks such as creating database objects, executing queries, and monitoring performance.

By adopting containerization for our application, we gain several benefits. Firstly, it enables us to package each component of the system with its dependencies, ensuring consistent and reproducible deployments across different environments. Containers provide isolation, preventing conflicts between components and offering improved security. Moreover, containerization simplifies the scalability of our application, allowing us to scale individual components independently based on demand.

Through the use of Docker containers, we create a modular and flexible architecture that facilitates easy deployment, management, and scalability of our application. The App container combines the front-end and server components, the Database container hosts our PostgreSQL database, and the PgAdmin container provides a user-friendly interface for database administration. Together, these containers form a cohesive and efficient system that powers our application.

[How to run PostgreSQL & PgAdmin in using Docker](../report/RunPostgreSQL.md)

[Docker Hub](https://hub.docker.com/repository/docker/visionman2002/project_pe_team6/tags?page=1&ordering=last_updated)
## 5.2 Git CI/CD
There are two-stage CI/CD pipeline to automate the build and testing processes of our application. 
### 5.2.1 Build Stage
- During the build stage, we locate our Dockerfile, which contains the instructions to build our application image.
- Using the "docker build" command, we initiate the build process, which compiles and packages our application into a Docker image.
- Once the image is built successfully, we push it into the container registry on our repository.
- This stage ensures that our application is properly built and packaged into a containerized format for further testing and deployment.
### 5.2.2 Test Stage
- In the test stage, we retrieve the recently pushed image from our container registry.
<div align="center">
<img src="../report/img/CICD_1.png" alt="CI/CD" width="600"/>
</div>

- Using the "docker run" command, we deploy the image as a container and execute our application within it.
- This step allows us to validate whether our application runs as expected and performs the desired functionalities.
- By checking the behavior and output of our application in the containerized environment, we can identify any potential issues or bugs.
<div align="center">
<img src="../report/img/CICD_2.png" alt="CI/CD" width="600"/>
</div>

By dividing our CI/CD pipeline into these two stages, we can ensure a streamlined and automated process for building and testing our application. The build stage ensures that our application is properly packaged, while the test stage allows us to validate its functionality within a controlled containerized environment. This approach helps us identify and address any issues early in the development cycle, ensuring a more reliable and robust application deployment.
## 5.3 Running App
To run our application, please follow these steps:

1. Pull the main branch from our GitLab repository to obtain the latest version of the code.
2. Open your terminal or command prompt and navigate to the project directory.
3. Execute the command "docker-compose up" to initiate the process of building the Docker image for our application.
4. Once the image is successfully built, you need to set up the PostgreSQL database in PgAdmin4 using Docker.
5. Access the PgAdmin4 interface by visiting the following link in your web browser: "[http://localhost:5050](http://localhost:5050/)".
6. In the PgAdmin4 interface, configure the connection to the PostgreSQL database by providing the necessary credentials and connection details.
7. Once the database connection is established, you are ready to start using the application.
8. To begin using the app, navigate to the login screen by following this link: "**[http://localhost:8000/GUI_Doctor/1_Login_screen/sign_in.html](http://localhost:8000/GUI_Doctor/1_Login_screen/sign_in.html)**".
9. From the login screen, you can log in using your credentials and access the application's features and functionalities.

By following these steps, you can set up and launch our application on your local environment. Please ensure that you have Docker installed and configured correctly before proceeding with the above instructions.
# 6. Appendices
## Appendix A: Glossary of Terms
<table style="width: 500px;">
  <tr>
    <th>CSS</th>
    <td>Cascading Style Sheets</td>
  </tr>
  <tr>
    <th>SQL</th>
    <td>Structured Query Language</td>
  </tr>
  <tr>
    <th>DBMS</th>
    <td>Database Management System</td>
  </tr>
  <tr>
    <th>ER Diagram</th>
    <td>Entity Relationship Diagram</td>
  </tr>
  <tr>
    <th>KDF</th>
    <td>Key Derivation Function</td>
  </tr>
  <tr>
    <th>ASIC</th>
    <td>Application-Specific Integrated Circuit</td>
  </tr>
  <tr>
    <th>RAM</th>
    <td>Random Access Memory</td>
  </tr>
  <tr>
    <th>JSON</th>
    <td>JavaScript Object Notation</td>
  </tr>
  <tr>
    <th>ReactJS</th>
    <td>React JavaScript</td>
  </tr>
  <tr>
    <th>PDF</th>
    <td>Portable Document Format</td>
  </tr>
  <tr>
    <th>HIPPA</th>
    <td>The Health Insurance Portability and Accountability Act</td>
  </tr>
  <tr>
    <th>PHI</th>
    <td>Protected Health Information</td>
  </tr>
  <tr>
    <th>PII</th>
    <td>Personally Identifiable Information</td>
  </tr>
  <tr>
    <th>JWT</th>
    <td>JSON Web Token</td>
  </tr>
  <tr>
    <th>OAuth2</th>
    <td>Open Authorization 2.0</td>
  </tr>
  <tr>
    <th>AES-256</th>
    <td>Advanced Encryption Standard with a 256-bit key</td>
  </tr>
  <tr>
    <th>Medical professional</th>
    <td>a doctor, nurse, or other healthcare provider who is registered with the hospital and provides medical care to patients.</td>
  </tr>
  <tr>
    <th>Online portal</th>
    <td>a web-based platform that allows patients and medical staff to manage their appointments and schedules.</td>
  </tr>
</table>

## Appendix B: Scrum review
### Sprint 1: Ideation and Planning
<table style="width: 500px;">
  <tr>
    <th>Time period</th>
    <td>From 20/02/2023 to 13/3/2023</td>
  </tr>
  <tr>
    <th>ID</th>
    <td>1</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The first sprint focused on setting up the development environment, defining the user stories, and creating the initial project structure.</td>
  </tr>
  <tr>
    <th>Worked on requirements</th>
    <td>
        <ul>
          <li>Project structure</li>
          <li>Draw diagrams (user stories)</li>
          <li>Development environment</li>
          <li>Front-end idea design</li>
          <li>Self-learning</li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Achievements</th>
    <td>Brainstormed ideas and chose hospital booking appointment as the project topic</td>
  </tr>
  <tr>
    <th>Difficulties</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Experience gained</th>
    <td>Teamwork and collaboration</td>
  </tr>
</table>

### Sprint 2: Doctor Functionality
<table style="width: 500px;">
  <tr>
    <th>Time period</th>
    <td>From 13/3/2023 to 24/3/2023</td>
  </tr>
  <tr>
    <th>ID</th>
    <td>2</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The second sprint focused on implementing the doctor's functions, including the ability to view patient appointments, treatment function and print patient records after treatment.</td>
  </tr>
  <tr>
    <th>Worked on requirements</th>
    <td>
        <ul>
          <li>Doctor GUI (function and button)</li>
          <li>Doctor Database structure</li>
          <li>Server for both Doctor and Patient</li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Achievements</th>
    <td>Designed the GUI, database, and server for doctors</td>
  </tr>
  <tr>
    <th>Difficulties</th>
    <td>Integration with Doctor functionality</td>
  </tr>
  <tr>
    <th>Experience gained</th>
    <td>For some of team members this is the first time we doing project so we some misunderstanding and communication between front-end and back-end</td>
  </tr>
</table>

### Sprint 3: Patient
<table style="width: 500px;">
  <tr>
    <th>Time period</th>
    <td>From 24/3/2023 to 10/4/2023</td>
  </tr>
  <tr>
    <th>ID</th>
    <td>3</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Implement a feature that allows patients to create account, view, book, reschedule appointments with the system.</td>
  </tr>
  <tr>
    <th>Worked on requirements</th>
    <td>
        <ul>
          <li>Patient GUI (function and button)</li>
          <li>Patient Database structure</li>
          <li>Server for both Doctor and Patient</li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Achievements</th>
    <td>Designed the GUI, database, and server for patients</td>
  </tr>
  <tr>
    <th>Difficulties</th>
    <td>Integration with Patient functionality</td>
  </tr>
  <tr>
    <th>Experience gained</th>
    <td>In this sprint Patient have much more function and requirement than Doctor, but we are also more familiars with the task so we can finish this in time.</td>
  </tr>
</table>

### Sprint 4: Connection between Doctor and Patient
<table style="width: 500px;">
  <tr>
    <th>Time period</th>
    <td>From 10/4/2023 to 24/4/2023</td>
  </tr>
  <tr>
    <th>ID</th>
    <td>4</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Connecting Doctor and Patient Functionality</td>
  </tr>
  <tr>
    <th>Worked on requirements</th>
    <td>
        <ul>
          <li>Database connections</li>
          <li>Server for both Doctor and Patient</li>
          <li>GUI design</li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Achievements</th>
    <td>Successfully connected Doctor and Patient functionality</td>
  </tr>
  <tr>
    <th>Difficulties</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Experience gained</th>
    <td>Should have planing architecture at the beginning for easier connection between functions and database</td>
  </tr>
</table>

### Sprint 5: Testing, Clean Code, and Dockerization
<table style="width: 500px;">
  <tr>
    <th>Time period</th>
    <td>From 24/4/2023 to 15/5/2023</td>
  </tr>
  <tr>
    <th>ID</th>
    <td>5</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Conduct testing, code cleaning, and bug fixing, and implement Docker for deployment</td>
  </tr>
  <tr>
    <th>Worked on requirements</th>
    <td>
        <ul>
          <li>Testing</li>
          <li>Fix bug</li>
          <li>Clean code</li>
          <li>Docker </li>
          <li>Security</li>
          <li>GUI design</li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Achievements</th>
    <td>Improved code quality, containerised the application</td>
  </tr>
  <tr>
    <th>Difficulties</th>
    <td>Difficulty in configuring Docker for the system</td>
  </tr>
  <tr>
    <th>Experience gained</th>
    <td>
        <ul>
          <li>Experience with containerisation and deployment</li>
          <li>Experience with security protocols and encryption</li>
        </ul>
    </td>
  </tr>
</table>

### Sprint 6: Documentation and Presentation
<table style="width: 500px;">
  <tr>
    <th>Time period</th>
    <td>From 15/5/2023 to 22/5/2023</td>
  </tr>
  <tr>
    <th>ID</th>
    <td>6</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Create user documentation and prepare for system presentation</td>
  </tr>
  <tr>
    <th>Worked on requirements</th>
    <td>
        <ul>
          <li>Documentation (README file)</li>
          <li>Powerpoint and presentation’s script</li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Achievements</th>
    <td>Created detailed documentation and presented the project</td>
  </tr>
  <tr>
    <th>Difficulties</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Experience gained</th>
    <td>Experience with documentation(README file) and presentation</td>
  </tr>
</table>

## Appendix C: Gantt chart
<div align="center">
<img src="../report/img/GanttChart.png" alt="Gantt Chart" width="600"/>
</div>

## Appendix D: Product Backlog
| Features                    | Priority | Estimation | Notes                                                                                                                                                                                                                      |
|-----------------------------|----------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Project structure (Proposal)| High     | 5          | Define the overall structure of the project, including key components, features, and functionalities. Gather requirements and create a proposal document for stakeholder review and approval. Conduct initial research and planning. |
| Draw diagrams (user stories)| Medium   | 10         | Create visual representations, such as ER Diagrams, to illustrate the user stories or requirements of the application. These diagrams help in better understanding and communicating the functionality and interactions within the system.   |
| Doctor UI Development       | High     | 20         | Design and implement the user interface for the doctor's portion of the application. It includes creating screens, layouts, and interactive elements that facilitate a seamless and user-friendly experience for doctors.              |
| Doctor Database structure   | High     | 20         | Design and implement the database structure for storing doctor-related data, including doctor profiles, schedules, specialties, as well as diagnosis information for patients, medical indications, and prescribed medicines.        |
| Patient UI Development      | High     | 20         | Design and implement the user interface components and features specifically for the patient-facing side of the application. This includes creating screens, forms, navigation, and other UI elements that allow patients to interact with the system. |
| Patient Database structure  | High     | 20         | Design and set up the database structure specifically for storing patient-related data in the application. This includes defining the tables, relationships, and attributes necessary to store patient information such as personal details, medical history, appointments, diagnoses, indications, and prescriptions. |
| Server (DevOps)             | High     | 30         | Set up and manage the server infrastructure for the application. This includes tasks related to deployment, configuration, monitoring, scaling, and maintenance of the server environment. The goal is to ensure the reliable and efficient operation of the server, supporting the application's functionality and performance requirements. |
| Testing and Fixing bugs     | Medium   | 10         | Test the application to identify and address any issues, errors, or bugs. The task also encompasses the process of fixing identified bugs and ensuring that the application functions as intended. The goal is to deliver a high-quality and reliable product to end users by detecting and resolving any issues during the testing phase. |
| Security                    | Medium   | 20         | Implement session login with a 30-minute timeout duration. Assess and enhance application security measures. Ensure compliance with HIPAA standards. Monitor and update security protocols regularly. |
| Docker                      | Medium   | 20         | Containerize the application using Docker to enable consistent deployment across different environments. Utilize Docker images and containers to package and distribute the application components. Implement Docker Compose for managing multi-container deployments. Ensure scalability, portability, and ease of deployment with Docker. |
| CI/CD                       | Medium   | 15         | Implement Continuous Integration and Continuous Deployment (CI/CD) pipelines to automate the build, testing, and deployment processes. Set up a CI/CD system to facilitate frequent and reliable code integration, automated testing, and seamless deployment of updates to the production environment. |
| Clean code                  | Low      | 15         | Refactor and improve the codebase to ensure adherence to coding standards and best practices. Eliminate code duplication, improve readability, and enhance overall maintainability of the code. |
| Documentation               | Medium   | 10         | Prepare comprehensive documentation that covers the system architecture, modules, and functionalities. Include installation guides, user manuals, and developer documentation for future reference

## Appendix E: References
1. OAuth 2.0: **[https://oauth.net/2/](https://oauth.net/2/)**
2. Protected Health Information (PHI): **[https://www.hhs.gov/answers/hipaa/what-is-phi/index.html](https://www.hhs.gov/answers/hipaa/what-is-phi/index.html)**
3. Health Insurance Portability and Accountability Act (HIPAA): **[https://www.hhs.gov/hipaa/index.html](https://www.hhs.gov/hipaa/index.html)**
4. Git CI/CD: **[https://topdev.vn/blog/trien-khai-ci-cd-voi-gitlab/](https://topdev.vn/blog/trien-khai-ci-cd-voi-gitlab/)**
5. GUI Design Inspiration:
    - Pinterest: **[https://www.pinterest.com](https://www.pinterest.com/)**
    - Dribbble: **[https://dribbble.com/tags/dibble](https://dribbble.com/tags/dibble)**
    - GenCraft: **[https://gencraft.com](https://gencraft.com/)**
6. Template for Doctor Homepage: **[https://bootstrapmade.com/demo/Bethany/](https://bootstrapmade.com/demo/Bethany/)**
7. Connecting PostgreSQL and pgAdmin: **[https://migueldoctor.medium.com/how-to-run-postgresql-pgadmin-in-3-steps-using-docker-d6fe06e47ca1](https://migueldoctor.medium.com/how-to-run-postgresql-pgadmin-in-3-steps-using-docker-d6fe06e47ca1)**
8. Report Template: **[https://github.com/SShindow/MediMe](https://github.com/SShindow/MediMe)**
9. Web Structure Reference: **[https://umc.medpro.com.vn](https://umc.medpro.com.vn/)**
10. GUI Design Tools:
    - Balsamiq: **[https://balsamiq.com](https://balsamiq.com/)**
    - Diagrams.net: **[https://app.diagrams.net/](https://app.diagrams.net/)**
    - Lucid: **[https://lucid.app/](https://lucid.app/)**
    - Venngage: **[https://venngage.com/](https://venngage.com/)**
11. Generate GIF from Video: **[https://express.adobe.com/tools/convert-to-gif](https://express.adobe.com/tools/convert-to-gif)**