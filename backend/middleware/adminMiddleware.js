const adminMiddleware = async (req, res, next) => {
  try {
    const adminEmails = ['shivangkandoi@gmail.com']; // Add your admin email here
    
    // Add debug logs
    console.log('Checking admin access for:', req.user);
    console.log('Admin emails:', adminEmails);
    console.log('Is admin?', adminEmails.includes(req.user.email));
    
    // Allow if user is admin OR if they are the author of the content
    if (!req.user || (!adminEmails.includes(req.user.email) && req.user.email !== req.body.author)) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = adminMiddleware; 