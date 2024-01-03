import { useState, useEffect, useRef } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Select,
  MenuItem,  
} from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    classType: "",
    memberName: "",
    attendance: "",
    dateStr: "",
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
    setDialogOpen(false);
  };
  const handleDateClick = (info) => {
    // if ((info.start != null) && (info.start != "")){
      setEventData({
        title: "",
        classType: "",
        memberName: "",
        attendance: "",
        start: info.start,
        end: info.start,
      });
  
      setDialogOpen(true); 
    // }
    // else
    // {
    //   alert("날짜를 가져오지 못했슈~ \n잘좀 가져와 바유~ \n팝업창은 안띄울겨~\n\n[info.start" + info.start + "]");
    // }
  };

  const handleConfirmClick = () => {
    const { title, classType, memberName, attendance, start} = eventData;
    const calendarApi = calendarRef.current?.getApi();

    alert(start);

    if (calendarApi && (start !== null) && (start !== "")) {
      const selectedDate = start;   //calendarApi.getSelected()[0].start;

      calendarApi.addEvent({
        id: `${selectedDate}-${title}`,
        title,
        start: start,
        end: start,
        allDay: true,
        classType,
        memberName,
        attendance,
      });
    }

    handleDialogClose();
  };
  


  const handleInputChange = (fieldName) => (event) => {
    setEventData({ ...eventData, [fieldName]: event.target.value });
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `이 일정을 진짜로 지우고 싶은겨? '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
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
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
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
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              { id: "1234", title: "All-day event", date: "2024-01-14" },
              { id: "4321", title: "Timed event", date: "2024-01-28" },
            ]}
          />
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>이벤트 정보 입력</DialogTitle>
        <DialogContent>
          <TextField
            label="Selected Date"
            value={formatDate(eventData.start, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Title"
            value={eventData.title}
            onChange={handleInputChange("title")}
            fullWidth
            margin="normal"
          />
          <Select
            label="Class Type"
            value={eventData.classType}
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
            value={eventData.memberName}
            onChange={handleInputChange("memberName")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Attendance"
            value={eventData.attendance}
            onChange={handleInputChange("attendance")}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleConfirmClick}>확인</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;
