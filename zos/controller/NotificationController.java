package com.zos.controller;

import com.zos.exception.NotificationException;
import com.zos.exception.UserException;
import com.zos.model.Notification;
import com.zos.model.User;
import com.zos.response.MessageResponse;
import com.zos.services.NotificationService;
import com.zos.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Notification> createNotification(
            @RequestBody Notification notification,
            @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        Notification createdNotification = notificationService.createNotification(notification, user.getId());

        return new ResponseEntity<>(createdNotification, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Notification>> getNotifications(
            @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        List<Notification> notifications = notificationService.getNotificationsByUserId(user.getId());

        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(
            @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        List<Notification> notifications = notificationService.getUnreadNotifications(user.getId());

        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    @PutMapping("/read/{notificationId}")
    public ResponseEntity<Notification> markAsRead(
            @PathVariable Integer notificationId) throws NotificationException {

        Notification notification = notificationService.markAsRead(notificationId);
        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{notificationId}")
    public ResponseEntity<MessageResponse> deleteNotification(
            @PathVariable Integer notificationId) throws NotificationException {

        notificationService.deleteNotification(notificationId);
        MessageResponse res = new MessageResponse("Notification deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
