import { useState, useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    classType: "",
    memberName: "",
    attendance: "",
  });

  const calendarRef = useRef();

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();

    if (calendarApi) {
      const initialEvents = calendarApi.getEvents().map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        classType: event.extendedProps.classType,
        memberName: event.extendedProps.memberName,
        attendance: event.extendedProps.attendance,
      }));

      setCurrentEvents(initialEvents);
    }
  }, []);

  const handleDialogClose = () => {
    //alert("handleDialogClose");
    setDialogOpen(false);
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`이 일정을 진짜로 지우고 싶은겨? '${selected.event.title}'`)) {
      selected.event.remove();

      setCurrentEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.id !== selected.event.id);
        return updatedEvents;
      });
    }
  };

  // 옮길때 관여하는 넘인듯
  const handleEventDrop = (dropInfo) => {
    const updatedEvents = currentEvents.map((event) =>
      event.id === dropInfo.event.id
        ? {
            
            ...event,
            start: dropInfo.event.start,
            end: dropInfo.event.end,
          }
        : event
    );

    setCurrentEvents(updatedEvents);
  };

  const handleEventContent = (arg) => {
    const classType = arg.event.extendedProps.classType;
    const backgroundColor = getClassTypeColor(classType);
    // return {
    //   ...arg.view,
    //   backgroundColor,
    // };
    //alert("handleEventContent");

    return {
        html: `<div style="background-color: ${backgroundColor};">${arg.event.title}</div>`,
    };
  };

  const getClassTypeColor = (classType) => {
    //alert("10");
    switch (classType) {
      case "A":
        return colors.primary[500];
      case "B":
        return colors.greenAccent[500];
      case "C":
        return colors.blueAccent[500];
      default:
        return colors.grey[500];
    }
  };

  const handleDateClick = (info) => {
    setDialogOpen(true);
    setCurrentEvents([...currentEvents, info]);
    setFormData({
      title: "",
      classType: "",
      memberName: "",
      attendance: "",
    });
  };

  const handleFormSubmit = () => {
    const { title, classType, memberName, attendance } = formData;

    const calendarApi = calendarRef.current.getApi();

    if (title) {
      calendarApi.addEvent({
        id: `${currentEvents[0].dateStr}-${title}`,
        title,
        start: currentEvents[0].startStr,
        end: currentEvents[0].endStr,
        allDay: currentEvents[0].allDay,
        classType,
        memberName,
        attendance,
      });
      setDialogOpen(false);

      // 기존 currentEvents를 업데이트하지 않고 새로운 이벤트만 추가
      setCurrentEvents((prevEvents) => [
        ...prevEvents,
        {
          id: `${currentEvents[0].dateStr}-${title}`,
          title,
          start: currentEvents[0].startStr,
          end: currentEvents[0].endStr,
          allDay: currentEvents[0].allDay,
          classType,
          memberName,
          attendance,
        },
      ]);
    }
  };  

  // FullCalendar의 dayRender 이벤트를 사용하여 토요일은 파란색, 일요일 및 공휴일은 빨간색으로 스타일링 - 안댐
  const handleDayRender = (info) => {
    const dayOfWeek = info.date.getDay(); // 0은 일요일, 1은 월요일, ..., 6은 토요일

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // 일요일 또는 토요일인 경우
      info.el.style.color = dayOfWeek === 0 ? colors.redAccent[900] : colors.blueAccent[900];
      //info.el.style.color = 'white';
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR BAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: getClassTypeColor(event.classType), //colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Box
                        color={colors.grey[500]}
                    >
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <br />
                      Class Type: {event.classType}
                      <br />
                      Member Name: {event.memberName}
                      <br />
                      Attendance: {event.attendance}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            ref={calendarRef}
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            dayRender={handleDayRender} // 추가된 부분
            select={(info) => {
              setCurrentEvents([info]);         // 
              handleDateClick(info);
            }}
            eventTextColor={colors.grey[500]}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop} 
            eventContent={handleEventContent} 
            initialEvents={[
              {
                id: "1234",
                title: "All-day event",
                date: "2023-12-14",
                classType: "A",
                memberName: "홍길동",
                attendance: "출석",
              },
              {
                id: "4321",
                title: "Timed event",
                date: "2023-12-28",
                classType: "B",
                memberName: "홍길서",
                attendance: "결석",
              },
              ...currentEvents, // 추가된 부분
            ]}
          />
        </Box>
      </Box>

      {/* Custom Form Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} backgroundColor={colors.primary[400]}>
        <DialogTitle color={colors.grey[100]}>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={formData.title}
            onChange={handleInputChange("title")}
            fullWidth
            margin="normal"
          />
          <Select
            label="Class Type"
            value={formData.classType}
            onChange={handleInputChange("classType")}
            fullWidth
            margin="normal"
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
          <TextField
            label="Member Name"
            value={formData.memberName}
            onChange={handleInputChange("memberName")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Attendance"
            value={formData.attendance}
            onChange={handleInputChange("attendance")}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="end" mt="20px">
            <Button onClick={handleFormSubmit} color="secondary" variant="contained">
              이벤트를 추가할겨
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;