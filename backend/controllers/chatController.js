const SupportMessage = require('../models/SupportMessage');
const User = require('../models/User');

const populateMessage = (query) => query
    .populate('senderId', 'fullname email role profilePicture')
    .populate('recipientId', 'fullname email role profilePicture');

exports.getMySupportMessages = async (req, res) => {
    try {
        const messages = await populateMessage(SupportMessage.find({
            $or: [
                { senderId: req.user.id },
                { recipientId: req.user.id }
            ]
        })).sort({ createdAt: 1 });

        res.json({ success: true, count: messages.length, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.sendSupportMessage = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ success: false, message: 'Message text is required' });
        }

        if (req.user.role === 'admin') {
            return res.status(400).json({ success: false, message: 'Use the admin reply endpoint to respond to users' });
        }

        const message = await SupportMessage.create({
            senderId: req.user.id,
            recipientId: null,
            text: text.trim(),
            senderRole: req.user.role
        });

        const populated = await populateMessage(SupportMessage.findById(message._id));
        res.status(201).json({ success: true, data: populated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAdminSupportThreads = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const messages = await populateMessage(SupportMessage.find()).sort({ createdAt: 1 });
        const threadsByUser = new Map();

        messages.forEach((message) => {
            const user = message.senderRole === 'admin' ? message.recipientId : message.senderId;
            if (!user) return;

            const key = user._id.toString();
            const existing = threadsByUser.get(key) || {
                user,
                messages: [],
                lastMessage: null
            };

            existing.messages.push(message);
            existing.lastMessage = message;
            threadsByUser.set(key, existing);
        });

        const threads = Array.from(threadsByUser.values()).sort((a, b) => {
            return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
        });

        res.json({ success: true, count: threads.length, data: threads });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.replyAsAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ success: false, message: 'Reply text is required' });
        }

        const recipient = await User.findById(req.params.userId);
        if (!recipient || recipient.role === 'admin') {
            return res.status(404).json({ success: false, message: 'Support user not found' });
        }

        const message = await SupportMessage.create({
            senderId: req.user.id,
            recipientId: recipient._id,
            text: text.trim(),
            senderRole: 'admin'
        });

        const populated = await populateMessage(SupportMessage.findById(message._id));
        res.status(201).json({ success: true, data: populated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
