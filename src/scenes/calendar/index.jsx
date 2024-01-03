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
    dateStr: "",        // 추가됨
  });

  //================================================================
  // 웬만해서는 잘 바뀌지 않는 것들!
  //================================================================

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
  }, );   // 컴포넌트가 리렌더링 될때마다 useEffect 함수가 호출됨//                      // 기존소스 =>  }, []);       => 이경우는 맨처음의 한번만 실행되는 경우임

  const handleDialogClose = () => {
    setDialogOpen(false);
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

  const handleInputChange = (fieldName) => (event) => {
    setEventData({ ...eventData, [fieldName]: event.target.value });
  };
  //----------------------------------------------------------------

  const handleDateClick = (info) => {
    //setCurrentEvents([info]);
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

    //alert(start);

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
    //setCurrentEvents([]);
    //setCurrentEvents([...currentEvents]);
  };
  
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





  return (
    <Box m="20px">
      {/* <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" /> */}
      <Header title="일정관리" subtitle="일정을 관리하는 페이지 입니다." />
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
                  backgroundColor:
                    event.classType === 'A'
                      ? colors.greenAccent[500]
                      : event.classType === 'B'
                      ? colors.blueAccent[500]
                      : event.classType === 'C'
                      ? colors.redAccent[200]
                      : colors.grey[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}                
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Box>
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
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
            eventDrop={handleEventDrop} // 추가된 부분
            initialEvents={[
              {
                id: "1234",
                title: "All-day event",
                date: "2024-01-14",
                classType: "A",
                memberName: "홍길동",
                attendance: "출석",
              },
              {
                id: "4321",
                title: "Timed event",
                date: "2024-01-28",
                classType: "B",
                memberName: "홍길서",
                attendance: "결석",
              },
            ]}
          />
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose} backgroundColor={colors.primary[400]}>
      <DialogTitle color={colors.grey[100]}>이벤트 정보 입력</DialogTitle>
        <DialogContent sx={{
                '& label': {
                  // placeholder text color
                  color: colors.greenAccent[300],
                },
                '& label.Mui-focused': {
                  // 해당 input focus 되었을 때 placeholder text color
                  // floatng label을 사용할 때 처리 필요하다
                  color: colors.primary[400],
                },
                '& label.Mui-error': {
                  color: colors.redAccent[700],
                },
                '& .MuiOutlinedInput-root': { 
                  color: `${colors.grey[100]} !important`,
                  '& fieldset': {
                    borderColor: colors.blueAccent[700],
                  },
                },  
                '& .MuiButton-text': {
                    color : `${colors.grey[500]} !important`,
                },                              
              }}>
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
            sx={{
              ' .MuiOutlinedInput-root': {
                color: colors.grey[900],
                },
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
          <Box display="flex" justifyContent="end" mt="20px">
            <Button onClick={handleConfirmClick} color="secondary" variant="contained">확인</Button>
          </Box>          
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;
