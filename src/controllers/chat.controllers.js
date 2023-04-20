
import Chat from '../models/Chat'
import jwt from 'jsonwebtoken'
import User from '../models/User';
import config from '../config'


exports.getChatByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const chats = await Chat.find({ $or: [{ from: userId }, { to: userId }] })
        .populate({ path: 'from', select: 'email', options: { lean: true } })
        .populate({ path: 'to', select: 'name', options: { lean: true } })
        
        .sort({ date: -1 })
        .lean();
  
      // Transformar la respuesta para reemplazar el campo 'from._id' con 'from.name'
      const transformedChats = chats.map(chat => {
        return {
          to: chat.to.name,
          from: chat.from.email,
          subject: chat.subject,
          message: chat.message,
          date: chat.date
        };
      });
        
      res.status(200).json(transformedChats);
    } catch (error) {
      next(error);
    }
  };
  



exports.createChat = async (req, res, next) => {
    try {
      const { from, to, subject, message } = req.body;
      const fromUser = await User.findOne({ email: from });
      const toUser = await User.findOne({ email: to });

      if (!fromUser || !toUser) {
        
        return res.status(404).json({ message: 'User not found' });
      }
  
      const chat = new Chat({ from: fromUser._id, to: toUser._id, subject, message });
      await chat.save();
  
      res.status(201).json(chat);
    } catch (error) {
      next(error);
    }
};  


